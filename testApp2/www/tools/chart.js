function Chart(canvas)
{
    this.canvas = canvas;
    this.minValue = Number.MAX_VALUE;
    this.maxValue = Number.MAX_VALUE * -1;
    this.minDateTick = Number.MAX_VALUE;
    this.maxDateTick = Number.MAX_VALUE * -1;

    this.valueScaleWidth = 40;
    this.timeScaleHeight = 40;

    this.valueScaleMarkNumber = 5;
    this.timeScaleMarkNumber = 5;

    this.valueScaleMarkStep = 0;
    this.timeScaleMarkStep = 0;
    this.valueScaleStep = 0;
    this.timeScaleStep = 0;
    this.cursorIndex = -1;

    this.color = "#0000FF";
    this.values = [];
}

Chart.prototype.setColor = function (color)
{
    this.color = color;
};

Chart.prototype.setValues = function (values)
{
    this.values = values;
};

Chart.prototype.setCursorIndex = function(index)
{
    this.cursorIndex = index;
}

Chart.prototype.drawChart = function ()
{
    var context = this.canvas.getContext('2d');

    // Initialisation 
    for (var i = 0 ; i < this.values.length ; i++)
    {
        var data = this.values[i];

        this.minValue = Math.min(this.minValue, data.value);
        this.maxValue = Math.max(this.maxValue, data.value);
        this.minDateTick = Math.min(this.minDateTick, data.date);
        this.maxDateTick = Math.max(this.maxDateTick, data.date);
    }

    this.timeScaleMarkStep = (this.canvas.width - this.valueScaleWidth) / this.timeScaleMarkNumber;
    this.valueScaleMarkStep = (this.canvas.height - this.timeScaleHeight) / this.valueScaleMarkNumber;
    this.timeScaleStep = (this.canvas.width - this.valueScaleWidth) / (this.values.length - 1);
    this.valueScaleStep = (this.canvas.height - this.timeScaleHeight) / (this.maxValue - this.minValue);

    context.setLineDash([0, 0]);

    // Effacer les dessins précedents
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Dessin de l'echelle des valeurs
    context.beginPath();
    context.strokeStyle = "#000000";
    context.lineWidth = 1;
    context.moveTo(this.valueScaleWidth + 0.5, 0);
    context.lineTo(this.valueScaleWidth + 0.5, this.canvas.height - this.timeScaleHeight);
    context.stroke();
    context.closePath();

    context.font = "14px Georgia";
    context.textAlign = "right";
    context.textBaseline = "middle";

    for (var i = 0 ; i < this.valueScaleMarkNumber  ; i++)
    {
        var index = i * Math.max(this.values.length / this.valueScaleMarkNumber, 1);
        var value = ((this.maxValue - this.minValue) / this.valueScaleMarkNumber) * i + this.minValue;

        context.fillText(value.toPrecision(4), this.valueScaleWidth, this.canvas.height - this.timeScaleHeight - (i * this.valueScaleMarkStep));
    }

    // Dessin du quadrillage
    context.beginPath();
    context.strokeStyle = "#AAAAAA";
    context.lineWidth = 1;

    for (var i = 0 ; i < this.valueScaleMarkNumber ; i++)
    {
        context.moveTo(this.valueScaleWidth + 1, i * this.valueScaleMarkStep + 0.5);
        context.lineTo(this.canvas.width, i * this.valueScaleMarkStep + 0.5);
    }

    for (var i = 0 ; i < this.timeScaleMarkNumber ; i++)
    {
        context.moveTo((i + 1) * this.timeScaleMarkStep + this.valueScaleWidth - 0.5, 0);
        context.lineTo((i + 1) * this.timeScaleMarkStep + this.valueScaleWidth - 0.5, this.canvas.height - this.timeScaleHeight);
    }

    context.stroke();
    context.closePath();



    // Dessin de l'échelle de temps
    context.beginPath();

    context.strokeStyle = "#000000";
    context.lineWidth = 1;
    context.moveTo(this.valueScaleWidth, this.canvas.height - this.timeScaleHeight - 0.5);
    context.lineTo(this.canvas.width, this.canvas.height - this.timeScaleHeight - 0.5);
    context.stroke();    

    context.closePath();

    context.font = "14px Georgia";
    context.textAlign = "center";
    context.textBaseline = "top";

    for (var i = 0 ; i < this.timeScaleMarkNumber ; i++)
    {
        var index = i * Math.max(this.values.length / this.timeScaleMarkNumber, 1);
        var date = new Date(Number.parseInt(this.values[index].date));

        context.fillText(date.toLocaleTimeString()  , this.timeScaleMarkStep * i + this.valueScaleWidth, this.canvas.height - this.timeScaleHeight);
    }

    // Dessin de la courbe
    context.beginPath();

    context.strokeStyle = this.color;

    for (var i = 0 ; i < this.values.length ; i++)
    {
        var val = parseFloat(this.values[i].value);
        var posX = i * this.timeScaleStep + this.valueScaleWidth;
        var posY = this.canvas.height - ((val - this.minValue) * this.valueScaleStep) - this.timeScaleHeight;

        if (i == 0)
        {
            context.moveTo(posX, posY);
        }
        else
        {
            context.lineTo(posX, posY);
            context.arc(posX, posY, 3, 0, 2 * Math.PI, false);
            context.moveTo(posX, posY);
        }
    }
    context.stroke();

    context.closePath();

    // Dessin du curseur
    if (this.cursorIndex > -1 && this.cursorIndex < this.values.length)
    {
        context.beginPath();
        

        context.strokeStyle = "#000000";
        context.setLineDash([5, 15]);

        context.moveTo(this.timeScaleStep * this.cursorIndex + this.valueScaleWidth, 0);
        context.lineTo(this.timeScaleStep * this.cursorIndex + this.valueScaleWidth, this.canvas.height - this.timeScaleHeight)
        context.moveTo(this.valueScaleWidth, (this.canvas.height - this.timeScaleHeight) - (this.values[this.cursorIndex].value - this.minValue) * this.valueScaleStep);
        context.lineTo(this.canvas.width, (this.canvas.height - this.timeScaleHeight) - (this.values[this.cursorIndex].value - this.minValue) * this.valueScaleStep);

        context.stroke();

        context.closePath();
    }
};
