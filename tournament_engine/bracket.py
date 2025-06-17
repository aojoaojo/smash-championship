# tournament_engine/bracket.py
class Match:
    def __init__(self, team1, team2):
        self.team1 = team1
        self.team2 = team2
        self.winner = None

class Tournament:
    def __init__(self, teams):
        self.matches = []
        self.schedule_first_round(teams)

    def schedule_first_round(self, teams):
        for i in range(0, len(teams), 2):
            self.matches.append(Match(teams[i], teams[i+1]))

    def record_result(self, match_index, winner):
        self.matches[match_index].winner = winner

    def get_next_match(self):
        for m in self.matches:
            if m.winner is None:
                return m
        return None
