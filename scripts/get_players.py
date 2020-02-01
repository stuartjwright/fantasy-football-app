import json
import os

with open(os.path.expanduser('~/fantasy-football/data/players.json'), 'r') as f:
    blob = f.read()
    
d = json.loads(blob)
teams = d['teams']
players = d['elements']
teams = {t['code']: t['name'] for t in teams}
positions = {1: 'Goalkeeper', 2: 'Defender', 3: 'Midfielder', 4: 'Forward'}
players = [{'firstName': p['first_name'], 'lastName': p['second_name'], 'displayName': p['web_name'], 'team': teams[p['team_code']], 'position': positions[p['element_type']]} for p in players]

mongo_format = '\n'.join([json.dumps(p) for p in players])

with open(os.path.expanduser('~/fantasy-football/data/playerData.json'), 'w') as f:
    f.write(mongo_format)