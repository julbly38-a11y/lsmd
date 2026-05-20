#!/usr/bin/env python3
"""Геокодування населених пунктів (localities) через OSM Nominatim.

Вимоги: pip install psycopg[binary] requests
Використання: встав SUPABASE_DB_URL, запусти python geocode_localities.py
Nominatim: 1 запит/сек, ~40 хв на всі н.п.
"""
import os, time, requests, psycopg

DB_URL = os.getenv('SUPABASE_DB_URL', 'postgresql://postgres:[PASSWORD]@db.wnyfrckxhwujsjcfxqou.supabase.co:5432/postgres')
REGION_FILTER = None  # 'Чернівецька' або None для всіх
H = {'User-Agent': 'LSMD-Geocoder/1.0'}
PAUSE = 1.1

def geocode(city, district, region):
    queries = [f'{city}, {region} область, Україна', f'{city}, Україна']
    for q in queries:
        try:
            r = requests.get('https://nominatim.openstreetmap.org/search',
                params={'q': q, 'format':'json','limit':1,'countrycodes':'ua'}, headers=H, timeout=10)
            if r.status_code==200 and r.json():
                d = r.json()[0]
                return float(d['lat']), float(d['lon'])
        except Exception: pass
        time.sleep(PAUSE)
    return None, None

def main():
    conn = psycopg.connect(DB_URL); cur = conn.cursor()
    where = 'latitude IS NULL'; params = []
    if REGION_FILTER:
        where += ' AND region = %s'; params.append(REGION_FILTER)
    cur.execute(f'SELECT id, city_name, district, region FROM localities WHERE {where} ORDER BY patients_count DESC', params)
    rows = cur.fetchall()
    print(f'До геокодування: {len(rows)}')
    for i,(lid,city,district,region) in enumerate(rows,1):
        lat,lng = geocode(city,district,region)
        if lat:
            cur.execute('UPDATE localities SET latitude=%s,longitude=%s,geocoded_at=now() WHERE id=%s',(lat,lng,lid))
            conn.commit()
            print(f'[{i}/{len(rows)}] {city} OK')
        else:
            print(f'[{i}/{len(rows)}] {city} NOTFOUND')
    cur.close(); conn.close()

if __name__=='__main__': main()
