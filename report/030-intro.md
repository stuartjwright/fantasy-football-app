\newpage

# Introduction

This report documents the development of a multiplayer fantasy football game, featuring a real-time auction, implemented as a web application.

## Terminology

In this document, **football** means association football, or soccer as it is known in some countries.

The word **player** will always refer to a real-life football player, as opposed to a person playing this fantasy football game. The person using the application will typically be referred to as the **user**, but depending on the context they may also be referred to as a **manager** (of their fantasy football team) or a **participant** (in an auction).

Similarly, a distinction between real-life football clubs and fantasy teams is necessary. A real-life football club (e.g. Liverpool or Arsenal) will be referred to as a **club**, whereas where the word **squad** is used, it will always refer to a fantasy team. The word **team** may refer to either, but its meaning will be made clear from the context.

## Fantasy Sports

Fantasy sports are games in which participants build imaginery teams consisting of real sports players. These fantasy teams then compete against each other, scoring points based on the real-life performance of the players selected. Fantasy sports predate the Internet[@fantasy_sports], but the game format is well-suited to online play.

There are several variations in how the game is played, even before taking into account different sports. In some variations, the same player can appear in an unlimited number of fantasy teams. This is common in large leagues which allow thousands or even millions of participants, where it would be infeasible to place constraints on how many participants can have a certain player in their team.

In smaller leagues however, it is common that each player can appear in only one fantasy team in the league. In such cases, it is necessary to begin the game with some method of working out which managers get which players for their fantasy teams. The simplest method is known as the **draft**: managers simply take it in turns to select a player from those available, until all squads are complete. However, for those looking for an extra layer of strategy, the **auction** is preferred. In an auction, each manager starts out with a fixed budget, and must assemble a squad of players by bidding against other managers. The auction is the method of squad selection which has been chosen for this application.

Another distinction to draw is between **daily** and **season-long** fantasy sports. In season-long games, the idea is to pick a squad that will score the most points over an entire season, typically over many months. Mid-season changes to squads are often permitted in these games. In daily games, the aim is to pick a squad which will score well in one specific event. Despite the name, this event may last for a few days (for example, a four-day golf tournament, or a round of football fixtures spread over a weekend). In such games, once the initial squad is selected, it typically cannot be changed. Point-scoring is typically also more granular in daily games. In football for example, a season-long game might only award points for goals scored or assisted, but a daily game will additionally award a small number of points for more common occurrences such as completing a pass, or a successful tackle. This application is intended for daily games, although most of the logic could apply to either and could be adapted.

