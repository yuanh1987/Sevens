# Sevens
This is a two-player version of the [Sevens](https://en.wikipedia.org/wiki/Sevens_(card_game)) card game invented by my sister and myself, and coded in ReactJS. A Pen is also created on CodePen.io. You can find this version [here](https://codepen.io/whereitisvc/pen/NMzbRV).

## Rules For Two Players
Sevens is originally designd for 3-4 players. To make it playable for two players, the following new rules apply:
1. Two joker cards (red and black) are in the game. There are a total of 54 cards (13\*4+2).
2. At the start of the game, distribute 54 cards equally to three piles (18\*3): playerA hand, playerB hand, and WILD.
3. Red joker card can be any card in Heart or Diamond. Black joker card can be any card in Spade or Club.
4. After you fold a card (This happens when you have no card to play), draw and reveal one card from WILD.
5. Whenever the revealed card from WILD is usable (can be moved to board), move it to the board. Otherwise, leave it revealed in WILD.

## Rules For Special Cases
Above are the main new rules introduced to the two-player Sevens game. To accommodate special situations outlined below, addtional rules apply:
1. If you have the card that your opponent play joker as, you should discard it (not fold it), and draw a new card from WILD.
2. If the card you reveal from WILD already existed on the board (because of the joker cards), draw another card from WILD.

## Demo
https://youtu.be/hC0FG8tmRZ8
<br>
<img src="demo/1.JPG" width=550 height=400/>
