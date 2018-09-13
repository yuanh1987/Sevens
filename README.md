# Sevens
This is a two-players version [Sevens](https://en.wikipedia.org/wiki/Sevens_(card_game)) cards game invented by my sister and myself, coded in ReactJS. A Pen created at CodePen.io. You can find this one at [here](https://codepen.io/whereitisvc/pen/NMzbRV).

## Additional Rules
In order to make it playable for two players (Sevens is originally designed for 3~4 players), some additional rules are applied:
1. Two joker cards (red and black) are in the game. There are total 54 cards (13\*4+2).
2. At the start of the game, distribute 54 cards equally to three piles (18\*3): playerA hand, playerB hand and WILD.
3. Red joker card can be any card in Heart or Diamond. Black joker card can be any card in Spade or Club.
4. After you fold a card (happen when you have no card can play), reveal one card from WILD.
5. Whenever the revealed card in WILD is avaliable (can be moved to board), move it to board. Otherwise, leave it revealed in WILD.

## Rules For Special Cases
Above are the main new rules apply to two-players version Sevens game. There are still have several rules for special cases:
1. If you have the card that your opponent play joker as, you should discard it (not fold it) and draw a new card from WILD.
2. If the card you reveal from WILD already existed on board (because of jokers), reveal another card from WILD.

## Demo
https://youtu.be/hC0FG8tmRZ8
<br>
<img src="demo/1.JPG" width=550 height=400/>
