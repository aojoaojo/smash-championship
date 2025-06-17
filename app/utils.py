import random

def generate_unique_teams(players, used_teams):
    players_copy = players[:]
    # Se número ímpar, adiciona bot
    if len(players_copy) % 2 != 0:
        if "Bot" not in players_copy:
            players_copy.append("Bot")

    attempts = 0
    max_attempts = 100

    while attempts < max_attempts:
        attempts += 1
        shuffled = players_copy[:]
        random.shuffle(shuffled)

        teams = []
        for i in range(0, len(shuffled), 2):
            team = tuple(sorted([shuffled[i], shuffled[i+1]]))
            teams.append(team)

        if not any(team in used_teams for team in teams):
            used_teams.update(teams)
            return teams

    return teams