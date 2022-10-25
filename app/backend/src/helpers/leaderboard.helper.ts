import TeamsModel from '../models/teams.model';
import IMatch from '../interfaces/IMatch';
import ILeaderboard from '../interfaces/ILeaderboard';

function sortLeaderboard(lb: ILeaderboard[]) {
  const sorted = lb.sort((a: ILeaderboard, b: ILeaderboard) => {
    if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
    if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
    if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
    if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
    return b.goalsOwn - a.goalsOwn;
  });
  return sorted;
}

export function calculateTotalGames(matches: IMatch[], teamId: number) {
  const totalGames = matches.reduce((acc, curr) => {
    if (curr.homeTeam === teamId || curr.awayTeam === teamId) return acc + 1;
    return acc;
  }, 0);
  return totalGames;
}

export function calculateGoalsFavor(matches: IMatch[], teamId: number) {
  const totalGoals = matches.reduce((acc, curr) => {
    if (curr.homeTeam === teamId) return acc + curr.homeTeamGoals;
    if (curr.awayTeam === teamId) return acc + curr.awayTeamGoals;
    return acc;
  }, 0);
  return totalGoals;
}

export function calculateTotalVictories(matches: IMatch[], teamId: number) {
  const totalVictories = matches.reduce((acc, curr) => {
    if (curr.homeTeam === teamId && curr.homeTeamGoals > curr.awayTeamGoals) return acc + 1;
    if (curr.awayTeam === teamId && curr.awayTeamGoals > curr.homeTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return totalVictories;
}

export function calculateTotalDraws(matches: IMatch[], teamId: number) {
  const totalDraws = matches.reduce((acc, curr) => {
    if ((curr.homeTeam === teamId || curr.awayTeam === teamId)
    && curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return totalDraws;
}

export function calculateTotalLosses(matches: IMatch[], teamId: number) {
  const totalLosses = matches.reduce((acc, curr) => {
    if (curr.homeTeam === teamId && curr.homeTeamGoals < curr.awayTeamGoals) return acc + 1;
    if (curr.awayTeam === teamId && curr.awayTeamGoals < curr.homeTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return totalLosses;
}

export function calculatePoints(matches: IMatch[], teamId: number) {
  const victories = calculateTotalVictories(matches, teamId);
  const draws = calculateTotalDraws(matches, teamId);
  return victories * 3 + draws;
}

export function calculateGoalsOwn(matches: IMatch[], teamId: number) {
  const goalsOwn = matches.reduce((acc, curr) => {
    if (curr.homeTeam === teamId) return acc + curr.awayTeamGoals;
    if (curr.awayTeam === teamId) return acc + curr.homeTeamGoals;
    return acc;
  }, 0);
  return goalsOwn;
}

export function calculateGoalsBalance(matches: IMatch[], teamId: number) {
  const goalsFavor = calculateGoalsFavor(matches, teamId);
  const goalsOwn = calculateGoalsOwn(matches, teamId);
  return goalsFavor - goalsOwn;
}

export function calculateTeamEfficiency(matches: IMatch[], teamId: number) {
  const totalPoints = calculatePoints(matches, teamId);
  const totalGames = calculateTotalGames(matches, teamId);
  return +((totalPoints / (totalGames * 3)) * 100).toFixed(2);
}

export default function generateLeaderboard(matches: IMatch[], teams: TeamsModel[]) {
  const leaderboard = teams.map(({ id, teamName }) => {
    const teamLeaderboard = {
      name: teamName,
      totalPoints: calculatePoints(matches, id),
      totalGames: calculateTotalGames(matches, id),
      totalVictories: calculateTotalVictories(matches, id),
      totalDraws: calculateTotalDraws(matches, id),
      totalLosses: calculateTotalLosses(matches, id),
      goalsFavor: calculateGoalsFavor(matches, id),
      goalsOwn: calculateGoalsOwn(matches, id),
      goalsBalance: calculateGoalsBalance(matches, id),
      efficiency: calculateTeamEfficiency(matches, id),
    };
    return teamLeaderboard;
  });
  return sortLeaderboard(leaderboard);
}

function generateTeamLeaderboard(matches: IMatch[], teamId: number, teamName: string) {
  const leaderboard = {
    name: teamName,
    totalPoints: calculatePoints(matches, teamId),
    totalGames: calculateTotalGames(matches, teamId),
    totalVictories: calculateTotalVictories(matches, teamId),
    totalDraws: calculateTotalDraws(matches, teamId),
    totalLosses: calculateTotalLosses(matches, teamId),
    goalsFavor: calculateGoalsFavor(matches, teamId),
    goalsOwn: calculateGoalsOwn(matches, teamId),
    goalsBalance: calculateGoalsBalance(matches, teamId),
    efficiency: calculateTeamEfficiency(matches, teamId),
  };
  return leaderboard;
}

export function generateHomeLeaderboard(matches: IMatch[], teams: TeamsModel[]): ILeaderboard[] {
  const homeLeaderboard = teams.map(({ id, teamName }) => {
    const filtered = matches.filter((match) => match.homeTeam === id);
    return generateTeamLeaderboard(filtered, id, teamName);
  });
  return sortLeaderboard(homeLeaderboard);
}

export function generateAwayLeaderboard(matches: IMatch[], teams: TeamsModel[]): ILeaderboard[] {
  const homeLeaderboard = teams.map(({ id, teamName }) => {
    const filtered = matches.filter((match) => match.awayTeam === id);
    return generateTeamLeaderboard(filtered, id, teamName);
  });
  return sortLeaderboard(homeLeaderboard);
}
