// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"classes/Caisse.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Caisse = void 0;

var Caisse =
/** @class */
function () {
  function Caisse(_solde) {
    this.transaction = [];
    this.observers = [];
    this.solde = _solde;
  }

  Caisse.prototype.subscribeObeserver = function (obs) {
    this.observers.push(obs);
  };

  Caisse.prototype.unsubscribeObeserver = function (obs) {
    var idx = this.observers.indexOf(obs);

    if (idx !== -1) {
      this.observers.splice(idx, 1);
    }
  };

  Caisse.prototype.notifyObservers = function () {
    for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
      var element = _a[_i];
      element.getNotification(this);
    }
  };

  Caisse.prototype.getSolde = function () {
    return this.solde;
  };

  Caisse.prototype.getTransaction = function () {
    return this.transaction;
  };

  Caisse.prototype.addTransaction = function (tr) {
    this.transaction.push(tr);

    if (tr.getType() === 'credit') {
      this.solde += tr.getMontant();
    } else {}
  };

  return Caisse;
}();

exports.Caisse = Caisse; // export class Caisse{
//     constructor(
//         private solde: number, 
//         private transactions: Transaction[]
//     ){}
//     getTransactions(){
//         return this.transactions
//     }
//     getSolde(){
//         return this.solde
//     }
//     addTransaction(transaction:Transaction){
//         this.transactions.push(transaction)
//         if (transaction.getType() ==='debit'){
//             this.solde -= transaction.getMontant() 
//         }
//         else{
//             this.solde += transaction.getMontant()
//         }
//     }
// }
},{}],"classes/SoldeView.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoldeView = void 0;

var SoldeView =
/** @class */
function () {
  function SoldeView() {
    this.htmlSoldeView = document.querySelector('#soldeview');
  }

  SoldeView.prototype.getNotification = function (caisse) {
    console.log("SoldeView notifie par le nouveau ".concat(caisse.getSolde()));
    this.htmlSoldeView.innerText = caisse.getSolde().toString();
  };

  return SoldeView;
}();

exports.SoldeView = SoldeView;
},{}],"classes/Transaction.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transaction = void 0;

var Transaction =
/** @class */
function () {
  function Transaction(_type, _montant, _person, _motif) {
    this.type = _type;
    this.montant = _montant;
    this.person = _person;
    this.motif = _motif;
  }

  Transaction.prototype.getType = function () {
    return this.type;
  };

  Transaction.prototype.getMontant = function () {
    return this.montant;
  };

  Transaction.prototype.getPerson = function () {
    return this.person;
  };

  Transaction.prototype.getMotif = function () {
    return this.motif;
  };

  Transaction.prototype.TransactionText = function () {
    return "".concat(this.montant, " ont ete ").concat(this.type === 'credit' ? "deposes" : "retires", " par ").concat(this.person, " suite a : ").concat(this.motif);
  };

  return Transaction;
}();

exports.Transaction = Transaction; // export class Transaction {
//     constructor(
//         private type: string,
//         private montant: number,
//         private person: string,
//         private motif: string
//     ) {}
//     text(){
//         return `${this.montant} ont ete ${this.type === 'credit' ? "deposes" : "retires"} par ${this.person} suite a : ${this.motif}`
//     }
//     getMontant(){
//         return this.montant;
//     }
//     getType(){
//         return this.type;
//     }
// }
},{}],"app.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Caisse_1 = require("./classes/Caisse");

var SoldeView_1 = require("./classes/SoldeView");

var Transaction_1 = require("./classes/Transaction");

var caisse = new Caisse_1.Caisse(10000);
var soldeView = new SoldeView_1.SoldeView();
caisse.subscribeObeserver(soldeView);
var form = document.querySelector('.transaction');
form.addEventListener("submit", function (e) {
  e.preventDefault();
  var type = document.querySelector("#type");
  var montant = document.querySelector("#montant");
  var person = document.querySelector("#person");
  var motif = document.querySelector("#motif");
  var uneTransaction = new Transaction_1.Transaction(type.value, montant.valueAsNumber, person.value, motif.value);
  caisse.addTransaction(uneTransaction);
}); // const form = document.querySelector(".transaction") as HTMLFormElement;
// let maCaisse = new Caisse(1000, )
// const type = document.querySelector("#type") as HTMLFormElement;
// const montant = document.querySelector("#montant") as HTMLFormElement;
// const person = document.querySelector("#person") as HTMLFormElement;
// const motif = document.querySelector("#motif") as HTMLFormElement;
// const ol = document.querySelector("ol")!;
// form.addEventListener("submit" , (e: Event) => {
//     e.preventDefault();
//     let maTransaction = new Transaction(
//         type.value,
//         montant.valueAsNumber,
//         person.value,
//         motif.value
//         )
//         maCaisse.addTransaction(maTransaction);
//         render(maTransaction, ol)
//     });
//     const render = (tr: Transaction, container: HTMLUListElement):void => {
//         let li = document.createElement("li")
//         let h4 = document.createElement("h4")
//         let p = document.createElement("p")
//         h4.innerText = tr.getType()==='debit' ? "Debit" : "Credit"
//         h4.className = tr.getType()
//         li.className = tr.getType();
//         p.innerText = tr.TransactionText()
//         li.append(h4)
//         li.append(p)
//         container.append(li)
//     }
},{"./classes/Caisse":"classes/Caisse.ts","./classes/SoldeView":"classes/SoldeView.ts","./classes/Transaction":"classes/Transaction.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51644" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.ts"], null)
//# sourceMappingURL=/app.c61986b1.js.map