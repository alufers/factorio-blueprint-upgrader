/**
 * @author alufers<alufers@wp.pl>
 */
Vue.component('multiselect', VueMultiselect.default);

//extracted using /c for _, p in pairs(game.entity_prototypes) do game.player.print(p.name); end
var factorioEntities = ["wooden-chest", "iron-chest", "steel-chest", "storage-tank", "transport-belt", "fast-transport-belt", "express-transport-belt", "underground-belt", "fast-underground-belt", "express-underground-belt", "splitter", "fast-splitter", "express-splitter", "loader", "fast-loader", "express-loader", "burner-inserter", "inserter", "long-handed-inserter", "fast-inserter", "filter-inserter", "stack-inserter", "stack-filter-inserter", "small-electric-pole", "medium-electric-pole", "big-electric-pole", "substation", "pipe", "pipe-to-ground", "pump", "curved-rail", "straight-rail", "train-stop", "rail-signal", "rail-chain-signal", "locomotive", "cargo-wagon", "fluid-wagon", "car", "tank", "logistic-robot", "construction-robot", "logistic-chest-active-provider", "logistic-chest-passive-provider", "logistic-chest-requester", "logistic-chest-storage", "roboport", "small-lamp", "arithmetic-combinator", "decider-combinator", "constant-combinator", "power-switch", "programmable-speaker", "boiler", "steam-engine", "steam-turbine", "solar-panel", "accumulator", "electric-energy-interface", "nuclear-reactor", "heat-exchanger", "heat-pipe", "burner-mining-drill", "electric-mining-drill", "offshore-pump", "pumpjack", "stone-furnace", "steel-furnace", "electric-furnace", "assembling-machine-1", "assembling-machine-2", "assembling-machine-3", "oil-refinery", "chemical-plant", "centrifuge", "lab", "beacon", "land-mine", "stone-wall", "gate", "gun-turret", "laser-turret", "flamethrower-turret", "radar", "rocket-silo", "player-port", "player", "fish", "tree-01", "tree-02", "tree-02-red", "tree-03", "tree-04", "tree-05", "tree-06", "tree-06-brown", "tree-07", "tree-08", "tree-08-brown", "tree-08-red", "tree-09", "tree-09-brown", "tree-09-red", "dead-dry-hairy-tree", "dead-grey-trunk", "dead-tree", "dry-hairy-tree", "dry-tree", "green-coral", "red-desert-rock-big-01", "red-desert-rock-huge-01", "red-desert-rock-huge-02", "stone-rock", "small-biter-corpse", "medium-biter-corpse", "behemoth-biter-corpse", "big-biter-corpse", "biter-spawner-corpse", "small-spitter-corpse", "medium-spitter-corpse", "big-spitter-corpse", "behemoth-spitter-corpse", "spitter-spawner-corpse", "small-worm-corpse", "medium-worm-corpse", "big-worm-corpse", "small-remnants", "medium-remnants", "big-remnants", "straight-rail-remnants", "curved-rail-remnants", "small-scorchmark", "tree-01-stump", "tree-02-stump", "tree-03-stump", "tree-04-stump", "tree-05-stump", "tree-06-stump", "tree-07-stump", "tree-08-stump", "tree-09-stump", "wall-remnants", "big-ship-wreck-1", "big-ship-wreck-2", "big-ship-wreck-3", "medium-ship-wreck", "small-ship-wreck", "small-biter", "medium-biter", "big-biter", "behemoth-biter", "small-spitter", "small-worm-turret", "medium-spitter", "medium-worm-turret", "behemoth-spitter", "big-spitter", "big-worm-turret", "biter-spawner", "spitter-spawner", "market", "defender", "distractor", "destroyer", "acid-projectile-purple", "acid-splash-purple", "atomic-bomb-wave", "atomic-rocket", "big-explosion", "big-ship-wreck-grass", "blood-explosion-big", "blood-explosion-huge", "blood-explosion-small", "blood-fountain", "blood-fountain-big", "blood-particle", "blue-laser", "branch-particle", "brown-asterisk", "brown-cane-cluster", "brown-cane-single", "brown-carpet-grass", "brown-coral-mini", "brown-fluff", "brown-fluff-dry", "brown-hairy-grass", "cannon-projectile", "car-smoke", "character-corpse", "cluster-grenade", "coal-particle", "copper-ore-particle", "deconstructible-tile-proxy", "defender-capsule", "destroyer-capsule", "distractor-capsule", "electric-beam", "electric-beam-no-sound", "entity-ghost", "explosion", "explosion-gunshot", "explosion-gunshot-small", "explosion-hit", "explosion-remnants-particle", "explosive-cannon-projectile", "explosive-rocket", "explosive-uranium-cannon-projectile", "fire-flame", "fire-flame-on-tree", "fire-smoke", "fire-smoke-on-adding-fuel", "fire-smoke-without-glow", "fire-sticker", "flamethrower-fire-stream", "flying-text", "garballo", "garballo-mini-dry", "green-asterisk", "green-bush-mini", "green-carpet-grass", "green-coral-mini", "green-hairy-grass", "green-pita", "green-pita-mini", "green-small-grass", "grenade", "handheld-flamethrower-fire-stream", "iron-ore-particle", "item-on-ground", "item-request-proxy", "laser", "laser-bubble", "leaf-particle", "light-smoke", "massive-explosion", "medium-explosion", "nuclear-smoke", "orange-arrow-with-circle", "orange-coral-mini", "piercing-shotgun-pellet", "poison-capsule", "poison-cloud", "railgun-beam", "red-asterisk", "rocket", "rocket-defense-dummy", "rocket-silo-rocket", "rocket-silo-rocket-shadow", "root-A", "root-B", "shell-particle", "shotgun-pellet", "slowdown-capsule", "slowdown-sticker", "small-rock", "small-ship-wreck-grass", "smart-chest-dummy", "smoke", "smoke-building", "smoke-explosion-particle", "smoke-fast", "smoke-train-stop", "soft-fire-smoke", "stone-particle", "stun-sticker", "tank-flamethrower-fire-stream", "tank-smoke", "tile-ghost", "train-smoke", "turbine-smoke", "uranium-cannon-explosion", "uranium-cannon-projectile", "uranium-cannon-shell-explosion", "water-splash", "wooden-particle", "coal", "copper-ore", "crude-oil", "iron-ore", "stone", "uranium-ore"];

function deepCopy(input) {
    return JSON.parse(JSON.stringify(input)); //I'm just lazy
}

var presets = [
    {
        name: "Belts and splitters to yellow",
        img: "transport-belt",
        rules: [
            { "from": "express-transport-belt", "to": "transport-belt" },
            { "from": "express-underground-belt", "to": "underground-belt" },
            { "from": "express-splitter", "to": "splitter" },
            { "from": "fast-transport-belt", "to": "transport-belt" },
            { "from": "fast-underground-belt", "to": "underground-belt" },
            { "from": "fast-splitter", "to": "splitter" }
        ]
    },
    {
        name: "Belts and splitters to red",
        img: "fast-transport-belt",
        rules: [
            { "from": "transport-belt", "to": "fast-transport-belt" },
            { "from": "underground-belt", "to": "fast-underground-belt" },
            { "from": "splitter", "to": "fast-splitter" },
            { "from": "express-transport-belt", "to": "fast-transport-belt" },
            { "from": "express-underground-belt", "to": "fast-underground-belt" },
            { "from": "express-splitter", "to": "fast-splitter" }
        ]
    },
    {
        name: "Belts and splitters to blue",
        img: "express-transport-belt",
        rules: [
            { "from": "transport-belt", "to": "express-transport-belt" },
            { "from": "underground-belt", "to": "express-underground-belt" },
            { "from": "splitter", "to": "express-splitter" },
            { "from": "fast-transport-belt", "to": "express-transport-belt" },
            { "from": "fast-underground-belt", "to": "express-underground-belt" },
            { "from": "fast-splitter", "to": "express-splitter" }
        ]
    }
];

var app = new Vue({
    el: '#app',
    data: {
        blueprintInput: '',
        blueprintOutput: '',
        rules: [
            {
                from: null,
                to: null
            }
        ],
        selected: "iron-chest",
        factorioEntities: factorioEntities,
        errorMessage: "",
        presets: presets,
        preset: null
    },
    watch: {
        preset: function () {
            console.log("dupa")
            this.preset = null;
        }
    },
    methods: {
        addRule: function () {
            this.rules.push({
                from: null,
                to: null
            });
        },
        setPreset(preset) {
            this.rules = deepCopy(preset.rules);
        },
        removeRule: function (rule) {
            this.rules.splice(this.rules.indexOf(rule), 1);
        },
        upgrade: function () {
            this.errorMessage = "";
            try {
                var versionChar = this.blueprintInput[0];
                var decoded = atob(this.blueprintInput.slice(1));
                var arrayBuffer = new Uint8Array(new ArrayBuffer(decoded.length));
                for (var i = 0; i < decoded.length; i++) {
                    arrayBuffer[i] = decoded.charCodeAt(i);
                }
                var data = JSON.parse(pako.inflate(arrayBuffer, { to: "string" }));
                data.blueprint.entities = data.blueprint.entities.map(function (entity) {
                    if (entity && entity.name) {
                        this.rules.forEach(function (rule) {
                            if (entity.name === rule.from) {
                                entity.name = rule.to;
                            }
                        });
                    }
                    return entity;
                }.bind(this));
                this.blueprintOutput = versionChar + btoa(pako.deflate(JSON.stringify(data), { to: "string" }));
            } catch (e) {
                console.error(e);
                this.errorMessage = "Operation failed: " + e.message;
            }
        }
    }
});