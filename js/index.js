var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PATTERN = ["spade", "heart", "club", "diamond", "jokerRed", "jokerBlack"];
var PATCODE = ["\u2660", "\u2665", "\u2663", "\u2666", "\u2620", "\u2620"];
var STATE = ["", "no card", "joker red", "joker black", "joker wild", "wild card", "already on board"];

var Card = function (_React$Component) {
  _inherits(Card, _React$Component);

  function Card() {
    _classCallCheck(this, Card);

    return _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));
  }

  _createClass(Card, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var card = this.props.value;
      var pat = "card " + card.pattern;
      var content = card.content;

      if (card.status === "hide") {
        pat += " cardBack";content = "";
      } else if (card.status === "leave") {
        pat += " cardSlot";content = "";
      } else if (card.status === "trans") {
        pat += " cardTrans";
      } else if (card.status === "high") {
        pat += " cardHigh";
      } else if (card.status === "discard") {
        pat += " cardBack";
      }

      if (card.owner === "player1" || card.owner == "player2") pat += " playerCard";else if (card.owner === "wild") pat += " wildCard";else if (card.owner === "board") pat += " boardCard";else if (card.owner === "discard") pat += " discardCard";

      return React.createElement(
        "button",
        { className: pat, onClick: function onClick() {
            return _this2.props.onClick(card);
          } },
        content
      );
    }
  }]);

  return Card;
}(React.Component);

var Player = function (_React$Component2) {
  _inherits(Player, _React$Component2);

  function Player() {
    _classCallCheck(this, Player);

    return _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).apply(this, arguments));
  }

  _createClass(Player, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      var hand = this.props.value;
      var array = hand.map(function (card, index) {
        return React.createElement(Card, { key: index, value: card, onClick: function onClick(i) {
            return _this4.props.onClick(i);
          } });
      });
      return React.createElement(
        "div",
        { className: "player" },
        " ",
        array,
        " "
      );
    }
  }]);

  return Player;
}(React.Component);

var Board = function (_React$Component3) {
  _inherits(Board, _React$Component3);

  function Board() {
    _classCallCheck(this, Board);

    return _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).apply(this, arguments));
  }

  _createClass(Board, [{
    key: "renderboard",
    value: function renderboard(list) {
      var _this6 = this;

      var t = JSON.parse(JSON.stringify(list));
      var array = t.reverse().map(function (card, index) {
        return React.createElement(Card, { key: index, value: card, onClick: function onClick(i) {
            return _this6.props.onClick(i);
          } });
      });
      return array;
    }
  }, {
    key: "render",
    value: function render() {
      var board = this.props.value;
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "boardline" },
          this.renderboard(board[0])
        ),
        React.createElement(
          "div",
          { className: "boardline" },
          this.renderboard(board[1])
        ),
        React.createElement(
          "div",
          { className: "boardline" },
          this.renderboard(board[2])
        ),
        React.createElement(
          "div",
          { className: "boardline" },
          this.renderboard(board[3])
        )
      );
    }
  }]);

  return Board;
}(React.Component);

var Discard = function (_React$Component4) {
  _inherits(Discard, _React$Component4);

  function Discard() {
    _classCallCheck(this, Discard);

    return _possibleConstructorReturn(this, (Discard.__proto__ || Object.getPrototypeOf(Discard)).apply(this, arguments));
  }

  _createClass(Discard, [{
    key: "render",
    value: function render() {
      var _this8 = this;

      var discard = this.props.value;
      var card = { pattern: "", content: discard.length, owner: "discard" };
      if (discard.length == 0) card.status = "trans";else card.status = "discard";
      return React.createElement(
        "div",
        null,
        React.createElement(Card, { value: card, onClick: function onClick(i) {
            return _this8.props.onClick(i);
          } })
      );
    }
  }]);

  return Discard;
}(React.Component);

var Menu = function (_React$Component5) {
  _inherits(Menu, _React$Component5);

  function Menu() {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
  }

  _createClass(Menu, [{
    key: "render",
    value: function render() {
      var _this10 = this;

      var discript = ["Turn", "No card to play. Please discard one card.", "Red Joker. You can treat it as any red card.", "Black Joker. You can treat it as any black card.", "You have the card your opponent use joker treat as. Please draw one wild card.", "Please reveal one wild card.", "Already on board. Please reveal another wild card.", ""];
      var status = this.props.value; //console.log(status);
      var turn = status[0];

      var i = void 0;
      if (status[1] == STATE[0]) i = 0;else if (status[1] == STATE[1]) i = 1;else if (status[1] == STATE[2]) i = 2;else if (status[1] == STATE[3]) i = 3;else if (status[1] == STATE[4]) i = 4;else if (status[1] == STATE[5]) i = 5;else if (status[1] == STATE[6]) i = 6;else i = 7;
      discript[7] = status[1];

      var content1 = turn == "player1" ? discript[i] : "";
      var content2 = turn == "player2" ? discript[i] : "";
      var p1box = turn == "player1" ? "menubox menuboxhigh" : "menubox";
      var p2box = turn == "player2" ? "menubox menuboxhigh" : "menubox";
      return React.createElement(
        "div",
        { className: "menulayout" },
        React.createElement(
          "div",
          { className: p1box },
          " ",
          React.createElement(
            "p",
            null,
            "player 1"
          ),
          " ",
          React.createElement(
            "p",
            null,
            content1
          ),
          " "
        ),
        React.createElement(
          "button",
          { className: "menubtn", onClick: function onClick() {
              return _this10.props.restart();
            } },
          "restart"
        ),
        React.createElement(
          "button",
          { className: "menubtn", onClick: function onClick() {
              return _this10.props.undo();
            } },
          "undo"
        ),
        React.createElement(
          "button",
          { className: "menubtn", onClick: function onClick() {
              return _this10.props.redo();
            } },
          "redo"
        ),
        React.createElement(
          "div",
          { className: p2box },
          " ",
          React.createElement(
            "p",
            null,
            "player 2"
          ),
          " ",
          React.createElement(
            "p",
            null,
            content2
          ),
          " "
        )
      );
    }
  }]);

  return Menu;
}(React.Component);

var Game = function (_React$Component6) {
  _inherits(Game, _React$Component6);

  function Game(props) {
    _classCallCheck(this, Game);

    var _this11 = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

    var now = _this11.shuffle();
    _this11.state = {
      history: [{
        player1: now.player1,
        player2: now.player2,
        discard1: now.discard1,
        discard2: now.discard2,
        wild: now.wild,
        wildshow: now.wildshow,
        board: now.board,
        boardhigh: now.boardhigh,
        whitelist: now.whitelist,
        status: now.status
      }],
      step: 0
    };
    return _this11;
  }

  _createClass(Game, [{
    key: "numToCard",
    value: function numToCard(num) {
      var number = num;
      var joker = num > 51 ? true : false;
      var pattern = joker ? PATTERN[num - 52 + 4] : PATTERN[Math.floor(num / 13)];
      var JQK = ['J', 'Q', 'K'];
      var text = num % 13 + 1 > 10 ? JQK[num % 13 % 10] : num % 13 + 1;
      var content = (joker ? "" : text) + PATCODE[Math.floor(num / 13)];
      return { number: number, joker: joker, pattern: pattern, content: content, status: "show" };
    }
  }, {
    key: "shuffle",
    value: function shuffle() {
      var _this12 = this;

      // generate a list from 0 to 53 with random order 
      var acc = 0;
      var nums = Array(54).fill(0).map(function (el, index) {
        return acc++;
      }).sort(function (a, b) {
        return 0.5 - Math.random();
      });

      //distribute cards to players and wild area
      var comp = function comp(a, b) {
        return a.number - b.number;
      };
      var player1 = nums.slice(0, 18).map(function (num, i) {
        var card = _this12.numToCard(num);
        card.owner = "player1";
        card.status = "hide";
        return card;
      }).sort(comp);
      var player2 = nums.slice(18, 36).map(function (num, i) {
        var card = _this12.numToCard(num);
        card.owner = "player2";
        return card;
      }).sort(comp);
      var wild = nums.slice(36, 54).map(function (num, i) {
        var card = _this12.numToCard(num);
        card.owner = "wild";
        card.status = "hide";
        return card;
      });

      // initiate the board
      var board = [];
      acc = 0;
      for (var i = 0; i < 4; i++) {
        var temp = Array(13).fill(0).map(function (el, index) {
          return acc++;
        });
        board.push(temp.map(function (n, i) {
          var c = _this12.numToCard(n);
          c.owner = "board";
          c.status = "trans";
          return c;
        }));
      }

      var whitelist = [6, 19, 32, 45, 52, 53];
      var start = 0.5 - Math.random() > 0 ? "player1" : "player2";
      var hand = start == "player1" ? player1 : player2;
      var state = STATE[0];
      var count = whitelist.reduce(function (acc, num) {
        if (hand.find(function (c) {
          return c.number === num;
        })) return ++acc;
        return acc;
      }, 0);
      if (count == 0) state = STATE[1];

      return { player1: player1, player2: player2, discard1: [], discard2: [],
        wild: wild, board: board, wildshow: [], boardhigh: [-1, -1],
        whitelist: whitelist, status: [start, state] };
    }
  }, {
    key: "restart",
    value: function restart() {
      var now = this.shuffle();
      this.setState({ history: [{
          player1: now.player1,
          player2: now.player2,
          discard1: now.discard1,
          discard2: now.discard2,
          wild: now.wild,
          wildshow: now.wildshow,
          board: now.board,
          boardhigh: now.boardhigh,
          whitelist: now.whitelist,
          status: now.status
        }],
        step: 0 });
      this.gameCenter(now);
    }
  }, {
    key: "undo",
    value: function undo() {
      //if(this.state.step > 0) this.setState({step: --this.state.step});
      var history = this.state.history;
      var step = this.state.step;
      do {
        step--;
      } while (history[step].status[0] == "player1" && step > 0);
      this.setState({ step: step });
    }
  }, {
    key: "redo",
    value: function redo() {
      //if(this.state.step < this.state.history.length-1) this.setState({step: ++this.state.step});
      var history = this.state.history;
      var step = this.state.step;
      do {
        step++;
      } while (history[step].status[0] == "player1" && step < history.length);
      this.setState({ step: step });
    }
  }, {
    key: "addCardToOwner",
    value: function addCardToOwner(current, card) {
      var hand = current.status[0] === "player1" ? current.player1 : current.player2;
      var cardcpy = JSON.parse(JSON.stringify(card));
      cardcpy.owner = current.status[0];
      if (cardcpy.owner == "player1") cardcpy.status = "show";else cardcpy.status = "hide";
      hand.push(cardcpy);
      hand.sort(function (a, b) {
        return a.number - b.number;
      }); //console.log(hand);

      if (current.status[0] === "player1") current.player1 = hand;else current.player2 = hand;

      var pos = current.wild.findIndex(function (c) {
        return c.number === card.number;
      });
      current.wild[pos].status = "leave";
    }
  }, {
    key: "removeCardFromHand",
    value: function removeCardFromHand(current, card) {
      var hand = void 0;
      if (card.owner === "board") {
        var turn = current.status[0];
        hand = turn === "player1" ? current.player2 : current.player1;
      } else hand = card.owner === "player1" ? current.player1 : current.player2;
      var pos = hand.findIndex(function (c) {
        return c.number === card.number;
      });
      if (pos > -1) {
        hand.splice(pos, 1);return true;
      } else return false;
    }
  }, {
    key: "showCardOnBoard",
    value: function showCardOnBoard(current, card) {
      var board = current.board;
      var whitelist = current.whitelist;

      //show card on the board
      var col = Math.floor(card.number / 13);
      var pos = board[col].findIndex(function (c) {
        return c.number === card.number;
      });
      if (current.boardhigh[0] != -1) board[current.boardhigh[0]][current.boardhigh[1]].status = "show";
      board[col][pos].status = "high";
      current.boardhigh[0] = col;
      current.boardhigh[1] = pos;

      //remove card number from whitelist
      var pos2 = whitelist.indexOf(card.number);
      var checkonboard = whitelist.splice(pos2, 1);
      if (!card.joker) {
        if (card.number % 13 <= 6 && card.number % 13 !== 0) whitelist.push(card.number - 1);
        if (card.number % 13 >= 6 && card.number % 13 !== 12) whitelist.push(card.number + 1);
      }
    }
  }, {
    key: "handClick",
    value: function handClick(card) {
      var step = this.state.step;
      var history = this.state.history.slice();
      var next = JSON.parse(JSON.stringify(history[step]));
      var whitelist = next.whitelist;
      var turn = next.status[0];
      var state = next.status[1];

      // if in wrong state, return
      if (state !== STATE[0] && state !== STATE[1]) return;
      // if not his card, return
      if (card.owner !== turn) return;
      // if not in whitelist, return
      if (whitelist.indexOf(card.number) < 0 && state !== STATE[1]) return;

      // if no card, discard one card and reveal one wild card
      if (state === STATE[1]) {
        var discard = turn === "player1" ? next.discard1 : next.discard2;
        discard.push(card);
        this.removeCardFromHand(next, card);
        next.status[1] = STATE[5];
      }
      // the selected card is in the whitelist
      else {
          if (card.joker) {
            this.removeCardFromHand(next, card);
            next.status[1] = card.number === 52 ? STATE[2] : STATE[3];
          } else {
            this.showCardOnBoard(next, card);
            this.removeCardFromHand(next, card);
            next.status[0] = turn === "player1" ? "player2" : "player1";
            next.status[1] = STATE[0];
          }
        }

      // submit next object to gameCenter
      this.gameCenter(next);
    }
  }, {
    key: "wildClick",
    value: function wildClick(card) {
      var step = this.state.step;
      var history = this.state.history.slice();
      var next = JSON.parse(JSON.stringify(history[step]));
      var status = next.status;
      var wild = next.wild;
      var pos = wild.findIndex(function (c) {
        return c.number === card.number;
      });

      // if in wrong state, return
      if (status[1] !== STATE[4] && status[1] !== STATE[5] && status[1] !== STATE[6]) return;
      // if already revealed, return
      if (wild[pos].status != "hide") return;

      // already on the board(because jokers), choose another wild card 
      var col = Math.floor(card.number / 13);
      var onboard = card.joker ? -1 : next.board[col].findIndex(function (c) {
        if (c.number == card.number && c.status == "show") return 1;else return 0;
      });
      if (onboard > -1) {
        console.log("already on board");
        next.wild[pos].status = "leave";
        next.status[1] = STATE[6];
        this.gameCenter(next);
        return;
      }

      // opponent choose one wild card adding to his hand
      if (status[1] === STATE[4]) {
        this.addCardToOwner(next, card);
        next.status[1] = STATE[0];
      }
      // after discard one card, reveal one wild card
      else if (status[1] === STATE[5] || status[1] === STATE[6]) {
          var whitelist = next.whitelist;
          if (whitelist.indexOf(card.number) > -1) {
            //if in whitelist, move that card to board
            if (card.joker) {
              console.log("joker..");
              next.wild[pos].status = "leave";
              next.status[1] = card.number == 52 ? STATE[2] : STATE[3];
            } else {
              this.showCardOnBoard(next, card);
              next.wild[pos].status = "leave";
              next.status[0] = status[0] === "player1" ? "player2" : "player1";
              next.status[1] = STATE[0];
            }
          } else {
            //if not in whitelist, leave it showing in wild area
            next.wildshow.push(card.number);
            next.wild[pos].status = "show";
            next.status[0] = status[0] === "player1" ? "player2" : "player1";
            next.status[1] = STATE[0];
          }
        }

      // submit next object to gameCenter
      this.gameCenter(next);
    }
  }, {
    key: "boardClick",
    value: function boardClick(card) {
      var step = this.state.step;
      var history = this.state.history.slice();
      var next = JSON.parse(JSON.stringify(history[step]));
      var whitelist = next.whitelist;
      var status = next.status;

      // if in wrong state, return
      if (status[1] !== STATE[2] && status[1] !== STATE[3]) return;
      if (whitelist.indexOf(card.number) === -1) return;
      if (Math.floor(card.number / 13) % 2 === 0 && status[1] !== STATE[3]) return;
      if (Math.floor(card.number / 13) % 2 === 1 && status[1] !== STATE[2]) return;

      this.showCardOnBoard(next, card);
      var jokerwild = this.removeCardFromHand(next, card);

      // if opponent has the card you use joker replace with, go to STATE[4]
      next.status[0] = status[0] === "player1" ? "player2" : "player1";
      next.status[1] = jokerwild ? STATE[4] : STATE[0];

      // submit next object to gameCenter
      this.gameCenter(next);
    }
  }, {
    key: "discardClick",
    value: function discardClick() {
      var step = this.state.step;
      var history = this.state.history.slice();
      var next = JSON.parse(JSON.stringify(history[step]));
      var whitelist = next.whitelist;
      var status = next.status;
    }
  }, {
    key: "gameCenter",
    value: function gameCenter(next) {
      var _this13 = this;

      var step = this.state.step;
      var history = this.state.history.slice();
      var turn = next.status[0];
      var state = next.status[1];

      // check if wild has card can be revealed
      if (state == STATE[5]) {
        if (next.wild.findIndex(function (c) {
          if (c.status == "hide") return 1;return 0;
        }) == -1) {
          console.log("no hide card in wild");
          next.status[0] = turn === "player1" ? "player2" : "player1";
          next.status[1] = STATE[0];
        }
      }

      // chack if board is avaliable to red joker 
      if (state == STATE[2]) {
        var a = next.board[1].findIndex(function (c) {
          if (c.status == "trans") return 1;return 0;
        });
        var b = next.board[3].findIndex(function (c) {
          if (c.status == "trans") return 1;return 0;
        });
        if (a == -1 && b == -1) {
          console.log("none avaliable for jokerRed");
          next.status[0] = turn === "player1" ? "player2" : "player1";
          next.status[1] = STATE[0];
        }
      }

      // chack if board is avaliable to black joker 
      if (state == STATE[3]) {
        var _a = next.board[0].findIndex(function (c) {
          if (c.status == "trans") return 1;return 0;
        });
        var _b = next.board[2].findIndex(function (c) {
          if (c.status == "trans") return 1;return 0;
        });
        if (_a == -1 && _b == -1) {
          console.log("none avaliable for jokerBlack");
          next.status[0] = turn === "player1" ? "player2" : "player1";
          next.status[1] = STATE[0];
        }
      }

      // check before the next player turn
      if (next.status[1] === STATE[0]) {
        (function () {
          var wildshow = next.wildshow;
          var hand = turn === "player1" ? next.player1 : next.player2;
          var whitelist = next.whitelist;
          //check if wildshow has card can be moved to board
          var i = 0;
          while (i < wildshow.length) {
            if (whitelist.indexOf(wildshow[i]) > -1) {
              _this13.showCardOnBoard(next, { number: wildshow[i] });
              var pos = next.wild.findIndex(function (c) {
                return c.number === wildshow[i];
              });
              next.wild[pos].status = "leave";
              wildshow.splice(i, 1);
              i = 0;
            } else i++;
          }
          // check if next player hand has card to play
          var count = whitelist.reduce(function (acc, num) {
            if (hand.findIndex(function (c) {
              return c.number === num;
            }) > -1) return ++acc;
            return acc;
          }, 0);
          if (count === 0) next.status[1] = STATE[1];
        })();
      }

      // if both player have played all their cards, game end
      if (next.player1.length == 0 && next.player2.length == 0) {
        var p1 = next.discard1.reduce(function (acc, card) {
          return acc + card.number % 13 + 1;
        }, 0);
        var p2 = next.discard2.reduce(function (acc, card) {
          return acc + card.number % 13 + 1;
        }, 0);
        if (p1 < p2) {
          next.status[0] = "player1";
          next.status[1] = "player1: " + p1 + ", player2: " + p2 + ", player 1 win !";
        } else if (p2 < p1) {
          next.status[0] = "player2";
          next.status[1] = "player1: " + p1 + ", player2: " + p2 + ", player 2 win !";
        } else {
          next.status[1] = "player1: " + p1 + ", player2: " + p2 + ", draw !";
        }
        next.wild.map(function (c) {
          if (c.status == "hide") c.status = "show";return c;
        });
      }

      // update history stream
      if (step == history.length - 1) history.push(next);else {
        history[step + 1] = next;
        history.splice(step + 2);
      }

      // set state
      this.setState({ history: history, step: ++step });
    }
  }, {
    key: "basicAI",
    value: function basicAI(player) {
      var step = this.state.step;
      var history = this.state.history.slice();
      var next = history[step];
      var status = next.status;
      var hand = player === "player1" ? next.player1 : next.player2;
      var whitelist = next.whitelist;
      var wild = next.wild;

      if (status[1] == STATE[0]) {
        console.log("AI play card");
        var list = hand.filter(function (card) {
          if (whitelist.indexOf(card.number) > -1) return 1;
          return 0;
        }).sort(function (a, b) {
          return 0.5 - Math.random();
        });
        var i = 0;
        while (list[i].joker && i < list.length - 1) {
          i++;
        }this.handClick(list[i]);
      } else if (status[1] == STATE[1]) {
        console.log("AI no card");
        var _list = JSON.parse(JSON.stringify(hand)).sort(function (a, b) {
          return 0.5 - Math.random();
        });
        this.handClick(_list[0]);
      } else if (status[1] == STATE[2]) {
        console.log("AI play jokerRed");
        var _list2 = whitelist.filter(function (num) {
          if (num < 52 && Math.floor(num / 13) % 2 == 1) return 1;
          return 0;
        }).sort(function (a, b) {
          return 0.5 - Math.random();
        });
        var card = this.numToCard(_list2[0]);
        this.boardClick(card);
      } else if (status[1] == STATE[3]) {
        console.log("AI play jokerBlack");
        var _list3 = whitelist.filter(function (num) {
          if (num < 52 && Math.floor(num / 13) % 2 == 0) return 1;
          return 0;
        }).sort(function (a, b) {
          return 0.5 - Math.random();
        });
        var _card = this.numToCard(_list3[0]);
        this.boardClick(_card);
      } else {
        console.log("AI wild click");
        var _list4 = JSON.parse(JSON.stringify(wild)).filter(function (card) {
          if (card.status == "hide") return 1;else return 0;
        }).sort(function (a, b) {
          return 0.5 - Math.random();
        });
        this.wildClick(_list4[0]);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this14 = this;

      var history = this.state.history.slice();
      var current = history[this.state.step];
      //console.log(this.state.step);
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "player1" },
          React.createElement(Player, { value: current.player1, onClick: function onClick(i) {
              return _this14.handClick(i);
            } })
        ),
        React.createElement(
          "div",
          { className: "player2" },
          React.createElement(Player, { value: current.player2, onClick: function onClick(i) {
              return _this14.handClick(i);
            } })
        ),
        React.createElement(
          "div",
          { className: "wild" },
          React.createElement(Player, { value: current.wild, onClick: function onClick(i) {
              return _this14.wildClick(i);
            } })
        ),
        React.createElement(
          "div",
          { className: "board" },
          React.createElement(Board, { value: current.board, onClick: function onClick(i) {
              return _this14.boardClick(i);
            } })
        ),
        React.createElement(
          "div",
          { className: "discard1" },
          React.createElement(Discard, { value: current.discard1, onClick: function onClick(i) {
              return _this14.discardClick(i);
            } })
        ),
        React.createElement(
          "div",
          { className: "discard2" },
          React.createElement(Discard, { value: current.discard2, onClick: function onClick(i) {
              return _this14.discardClick(i);
            } })
        ),
        React.createElement(
          "div",
          { className: "menu" },
          React.createElement(Menu, { value: current.status, restart: function restart() {
              return _this14.restart();
            }, undo: function undo() {
              return _this14.undo();
            }, redo: function redo() {
              return _this14.redo();
            } })
        )
      );
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var step = this.state.step;
      var history = this.state.history.slice();
      var current = history[step];
      var status = current.status;
      if (status[0] == "player1") this.basicAI("player1");
      //if(status[0] == "player2") this.basicAI("player2");
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this15 = this;

      var step = this.state.step;
      var history = this.state.history.slice();
      var current = history[step];
      var status = current.status;

      if (status[0] == "player1") {
        setTimeout(function () {
          return _this15.basicAI("player1");
        }, 1500);
      }
      /*
      if(status[0] == "player2"){
        setTimeout(() => this.basicAI("player2"), 1500);
      }*/
    }
  }]);

  return Game;
}(React.Component);

ReactDOM.render(React.createElement(Game, null), document.getElementById('app'));