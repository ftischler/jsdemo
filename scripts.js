function Auto(marke, farbe) {
    //Step 1:
    this.marke = marke; //public
    this.farbe = farbe; //public
    this.geschwindigkeit = 0;   //public, Initialwert: 0
    this.hupen = hupen; //Funktionszuweisung
    Auto.prototype.beschleunigen = beschleunigen; //Funktionszuweisung
    Auto.prototype.bremsen = bremsen; //Funktionszuweisung

    //Step 2:
    Auto.prototype.beschleunigenAsync = beschleunigenAsync;
    Auto.prototype.bremsenAsync = bremsenAsync;
    var _darfBeschleunigen = true;
    var _darfBremsen = true;
    var _verzoegerung = 2000; //Zeit in ms

    //Step 1:
    function hupen() {
        console.log("Tuuuuuut");
    }

    function beschleunigen() {
        this.geschwindigkeit++;
    }

    function bremsen() {
        this.geschwindigkeit--;
    }

    //Step 2:
    function beschleunigenAsync(successCallback, errorCallback) {
        //Der Shit mit dem Scope von this:
        var _this = this;

        //Anonyme Function handler. Wird später setTimeout übergeben.
        var handler = function() {
          if(_darfBeschleunigen) {
            _this.beschleunigen();
            //Callback aufrufen:
            successCallback(_this.geschwindigkeit);
          }
          else {
            //Callback aufurfen:
            errorCallback("Beschleunigen ist nicht erlaubt!");
          }  
        };

        //setTimeout sorgt für einen zeitverzögerten Aufruf der Handler-Function (asynchron):
        setTimeout(handler, _verzoegerung);
        console.log("Beschleunigungsvorgang eingeleitet");
    }

    function bremsenAsync(successCallback, errorCallback) {
        //Der Shit mit dem Scope von this:
        var _this = this;

        //Anonyme Function handler. Wird später setTimeout übergeben.
        var handler = function() {
            if(_darfBremsen) {
                _this.bremsen();
                //Callback aufrufen:
                successCallback(_this.geschwindigkeit);
            }
            else {
                //Callback aufrufen:
                errorCallback("Bremsen ist nicht erlaubt!");
            }
        }

        //setTimeout sorgt für einen zeitverzögerten Aufruf der Handler-Function (asynchron):
        setTimeout(handler, _verzoegerung);
        console.log("Bremsvorgang eingeleitet");
    }
}

//Step 1:

//Neues Auto-Objekt erstellen:
var bmw = new Auto("BMW", "schwarz");

//Hupen:
bmw.hupen();

//Marke und Farbe:
console.log(bmw.marke);
console.log(bmw.farbe);

//Synchrones Fahren:
console.log("Synchrones Fahren");
console.log(bmw.geschwindigkeit);
bmw.beschleunigen();
console.log(bmw.geschwindigkeit);
bmw.bremsen();
console.log(bmw.geschwindigkeit);

//Step 2:

//Asynchrones Fahren:
console.log("Asynchrones Fahren:");
console.log(bmw.geschwindigkeit);

bmw.beschleunigenAsync(function(geschwindigkeit) {
    console.log("Der " + bmw.marke + " faehrt jetzt " + geschwindigkeit + " km/h");
}, function(error) {
    console.log(error);
});

console.log(bmw.geschwindigkeit);

bmw.bremsenAsync(function(geschwindigkeit) {
    console.log("Der " + bmw.marke + " faehrt jetzt " + geschwindigkeit + " km/h");
}, function(error) {
    console.log(error);
});

//Step 3:

var audi = {
    marke: "Audi",
    farbe: "silber",
    geschwindigkeit: 0,
    beschleunigen: Auto.prototype.beschleunigen,
    bremsen: Auto.prototype.bremsen,
    hupen: function() {
        console.log("Tutututututu ich bin 1 schwuler Audi");
    }
};

console.log(audi.marke);
console.log(audi.farbe);

audi.hupen();

console.log("Fahren");
console.log("Der " + audi.marke + " faehrt " + audi.geschwindigkeit + " km/h");
audi.beschleunigen();
console.log("Der " + audi.marke + " faehrt " + audi.geschwindigkeit + " km/h");
audi.bremsen();
console.log(audi.geschwindigkeit);