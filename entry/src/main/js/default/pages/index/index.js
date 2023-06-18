export default {
    data:{
        currentMonthStr: "",
        currentMonth: "",
        currentYear: "",
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        days: [],
        activeDay: "",
        daysLength: "",
        prevDays: "",
        lastDate: "",
        day: "",
        nextDaysCount: 7,
    },

    onInit(){
        let today = new Date();
        this.currentMonth = today.getMonth();
        this.currentMonthStr = this.months[this.currentMonth];
        this.currentYear = today.getFullYear();
        this.currentDay = today.getDate();

        this.showCalendar(this.currentMonth, this.currentYear);
        this.daysLength = this.days.length;
    },

    showCalendar(month, year) {
       this.prevDays = new Date(this.currentYear, this.currentMonth, 0).getDate();
       this.lastDate = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
       this.day = new Date(this.currentYear, this.currentMonth, 1).getDay();

       let days = []
       for (let x = this.day; x > 0; x--){
           days.push(this.prevDays - x + 1)
       }

       for (let i = 1; i <= this.lastDate; i++) {
           if (
           i === new Date().getDate() &&
           year === new Date().getFullYear() &&
           month === new Date().getMonth()
           ) {
               this.activeDay = i
           }
           days.push(i)
           this.daysLength = days.length
       }

       if ( this.daysLength <= 35) {
           this.nextDaysCount = 14
       }
       const nextDays = this.nextDaysCount - new Date(this.currentYear, this.currentMonth + 1, 0).getDay() - 1;
       for (let j = 1; j <= nextDays; j++) {
           days.push(j)
       }

        this.days = days
        this.year = year
        this.month = month
    },
    next() {
        this.currentYear = (this.currentMonth === 11) ? this.currentYear + 1 : this.currentYear;
        this.currentMonth = (this.currentMonth + 1) % 12;
        this.currentMonthStr = this.months[this.currentMonth]
        this.showCalendar(this.currentMonth, this.currentYear);
    },
    previous() {
        this.currentYear = (this.currentMonth === 0) ? this.currentYear - 1 : this.currentYear;
        this.currentMonth = (this.currentMonth === 0) ? 11 : this.currentMonth - 1;
        this.currentMonthStr = this.months[this.currentMonth]
        this.showCalendar(this.currentMonth, this.currentYear);
    },

    touchMove(e) { // Handle the swipe event.
         if (e.direction == "right") // Swipe right to exit.
         {
             this.previous();
         }
         else if (e.direction == "left") {
             this.next();
         }
     },

    selectYear(e) { // Handle the swipe event.
        if (e.direction == "left") // Swipe right to exit.
        {
            this.currentYear = this.currentYear +  1;
            this.showCalendar(this.currentMonth, this.currentYear);
        }
        else if (e.direction == "right") {
            this.currentYear = this.currentYear - 1;
            this.showCalendar(this.currentMonth, this.currentYear);
        }
    },
}