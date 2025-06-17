# tournament_engine/champion_manager.py
champions = ["Mario", "Link", "Pikachu", "Samus", "Fox"]

def pick_and_ban(teams):
    picks = {}
    for team in teams:
        banned = input(f"{team}: Ban a champion: ")
        available = [c for c in champions if c != banned]
        chosen = input(f"{team}: Pick a champion: ")
        picks[team] = {"ban": banned, "pick": chosen}
    return picks
