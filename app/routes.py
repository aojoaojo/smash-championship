from flask import Blueprint, render_template, request, redirect, session, url_for
from .utils import generate_unique_teams

main = Blueprint('main', __name__)

# Estado global
current_teams = []
players = ['Joao', 'Brisa', 'Jairo']
used_teams = set()
will_play_type = None  # armazenará tipo de campeonato
team_picks = {}  # { team: {'ban': str, 'pick': str} }
champions = ["Mario", "Link", "Pikachu", "Samus", "Fox"]
tournament_types = ["Double Elimination", "Swiss"]

def printar_dados():
    print("---------------------------------------------")
    print("players:", players)
    print("current_teams:", current_teams)
    print("used_teams:", used_teams)
    print("will_play_type:", will_play_type)
    print("team_picks:", team_picks)
    print("champions:", champions)
    print("---------------------------------------------")

@main.route("/")
def index():
    current_teams = []
    printar_dados()
    return render_template("index.html")

@main.route("/register", methods=["GET", "POST"])
def register():
    printar_dados()

    if request.method == "POST":
        name = request.form["name"]
        players.append(name)
        return redirect("/register")
    return render_template("register.html", players=players)

@main.route("/generate_teams")
def generate_teams():
    if len(players) < 2:
        return "Cadastre ao menos 2 jogadores para gerar duplas."

    temp = generate_unique_teams(players, used_teams)
    for i in temp:
        current_teams.append(i)
    printar_dados()

    return render_template("teams.html", teams=current_teams)

@main.route("/setup", methods=["GET", "POST"])
def setup():
    printar_dados()

    global will_play_type
    if request.method == "POST":
        will_play_type = request.form.get("type")
        # opcional: salvar em session
        session['tournament_type'] = will_play_type
        return redirect("/ban_pick")
    return render_template("setup.html", options=tournament_types)

@main.route("/ban_pick", methods=["GET", "POST"])
def ban_pick():
    printar_dados()

    if request.method == "POST":
        for idx, team in enumerate(current_teams):
            team_key = f"{'_'.join(team)}"
            ban = request.form.get(f"ban_{idx}")
            pick1 = request.form.get(f"pick1_{idx}")
            pick2 = request.form.get(f"pick2_{idx}")
            team_picks[team_key] = {'ban': ban, 'pick1': pick1, 'pick2': pick2}
        session['picks'] = team_picks
        return redirect(url_for('main.show_bracket'))
    return render_template("ban_pick.html", teams=current_teams, champions=champions)

@main.route("/bracket")
def show_bracket():
    printar_dados()

    teams = session.get('teams', [])
    picks = session.get('picks', {})
    return render_template("bracket.html", teams=teams, picks=picks)

@main.route("/results", methods=["GET", "POST"])
def results():
    printar_dados()
    
    # placeholder para registro de resultados
    return "Funcionalidade de resultados em desenvolvimento"
