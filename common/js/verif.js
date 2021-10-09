function VerifClass() {
    this.HEX = function(value) {
        return /^[A-Fa-f0-9]*$/.test(value);
    }

    this.OCT = function(value) {
        return /^[0-7]*$/.test(value);
    }

    this.BIN = function(value) {
        return /^[0-1]*$/.test(value);
    }

    this.onlyNum = function(value) {
        return /^[0-9]*$/.test(value);
    }

    this.mathNum = function(value) {
        return /^\d+(\.\d+)?$/.test(value) || /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/.test(value);
    }
    this.DEC = this.onlyNum;
}

let Verif = new VerifClass();