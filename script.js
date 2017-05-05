/**
 * @author alufers<alufers@wp.pl>
 */
Vue.component('multiselect', VueMultiselect.default);

//extracted using /c for _, p in pairs(game.entity_prototypes) do game.player.print(p.name); end
var factorioEntities = [
    "wooden-chest",
    "iron-chest",
    "steel-chest",
    "storage-tank",
    "transport-belt",
    "fast-transport-belt",
    "express-transport-belt",
    "underground-belt",
    "fast-underground-belt",
    "express-underground-belt",
    "splitter",
    "fast-splitter",
    "express-splitter",
    "loader",
    "fast-loader",
    "express-loader",
    "burner-inserter",
    "inserter",
    "long-handed-inserter",
    "fast-inserter",
    "filter-inserter",
    "stack-inserter",
    "stack-filter-inserter",
    "small-electric-pole",
    "medium-electric-pole",
    "big-electric-pole",
    "substation",
    "pipe",
    "pipe-to-ground",
    "pump",
    "curved-rail",
    "straight-rail",
    "train-stop",
    "rail-signal",
    "rail-chain-signal",
    "locomotive",
    "cargo-wagon",
    "fluid-wagon",
    "car",
    "tank",
    "logistic-chest-active-provider",
    "logistic-chest-passive-provider",
    "logistic-chest-requester",
    "logistic-chest-storage",
    "roboport",
    "small-lamp",
    "arithmetic-combinator",
    "decider-combinator",
    "constant-combinator",
    "power-switch",
    "programmable-speaker",
    "boiler",
    "steam-engine",
    "steam-turbine",
    "solar-panel",
    "accumulator",
    "electric-energy-interface",
    "nuclear-reactor",
    "heat-exchanger",
    "heat-pipe",
    "burner-mining-drill",
    "electric-mining-drill",
    "offshore-pump",
    "pumpjack",
    "stone-furnace",
    "steel-furnace",
    "electric-furnace",
    "assembling-machine-1",
    "assembling-machine-2",
    "assembling-machine-3",
    "oil-refinery",
    "chemical-plant",
    "centrifuge",
    "lab",
    "beacon",
    "land-mine",
    "stone-wall",
    "gate",
    "gun-turret",
    "laser-turret",
    "flamethrower-turret",
    "radar",
    "rocket-silo"
];

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