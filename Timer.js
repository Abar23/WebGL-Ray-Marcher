const MAX_TICKS = 1000;
const NUM_MILLIS_PER_FRAME = 10;
const FRACTAL_INCRMENT = 0.001;

class Timer
{
    constructor()
    {
        this.startingTime = new Date();
        this.elapsedTicks = 0;
        this.elapsedTime = 0;
        this.fractalIncrementer = 0.001;
    }

    GetTimeInMillis()
    {
        var endingTime = new Date();
        var elapsedTime = endingTime - this.startingTime;
        this.startingTime = endingTime;

        return elapsedTime;
    }

    Update()
    {
        this.elapsedTime += this.GetTimeInMillis();

        if(this.elapsedTime > NUM_MILLIS_PER_FRAME)
        {
            this.fractalIncrementer += FRACTAL_INCRMENT;
            this.elapsedTicks++;
            if(this.elapsedTicks == MAX_TICKS)
            {
                this.elapsedTicks = 0;
            }
            this.elapsedTime = 0;
        }
    }

    GetTicks()
    {
        return this.elapsedTicks;
    }
    
    GetTicksInRadians()
    {
        return ((this.elapsedTicks - MAX_TICKS) / (MAX_TICKS)) * (Math.PI * 2) 
    }

    GetFractalIncrement()
    {
        return this.fractalIncrementer;
    }
}