# tournament_engine/pairing.py
import random
from itertools import combinations

def generate_unique_teams(players, used_teams):
    while True:
        shuffled = players[:]
        random.shuffle(shuffled)
        teams = [(shuffled[i], shuffled[i + 1]) for i in range(0, len(shuffled), 2)]
        if set(teams).isdisjoint(used_teams):
            used_teams.update(teams)
            return teams
