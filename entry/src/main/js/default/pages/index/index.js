export default {
    data:{
        weekDays: ["S", "M", "T", "W", "T", "F", "S"],
        currentMonthStr: "",
        currentMonth: "",
        currentYear: "",
        firstDay: "",
        daysInMonth: "",
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        days: [],
        activeDay: 0,
        rowBasedHeight: 20,
        weekendColor: "#038C7F",
    },

    onInit(){
        let today = new Date();

        this.currentMonth = today.getMonth();
        this.currentMonthStr = this.months[this.currentMonth];
        this.currentYear = today.getFullYear();
        this.currentDay = today.getDate();

        this.showCalendar(this.currentMonth, this.currentYear)
    },

    showCalendar(month, year) {
        const prevDays = new Date(this.currentYear, this.currentMonth, 0).getDate();
        const lastDate = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        const day = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const nextDays = 7 - new Date(this.currentYear, this.currentMonth + 1, 0).getDay() - 1;

        let days = []

        for (let x = day; x > 0; x--){
            days.push(prevDays - x + 1)
        }

        for (let i = 1; i <= lastDate; i++) {
            if (
                i === new Date().getDate() &&
                year === new Date().getFullYear() &&
                month === new Date().getMonth()
            ) {
                this.activeDay = i
            }
            days.push(i)
        }

        for (let j = 1; j <= nextDays; j++) {
            days.push(j)
        }

        if (days.length > 36){
            this.rowBasedHeight = 16
        } else{
            this.rowBasedHeight = 20
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