import dayjs from 'dayjs'

const events = [
    {
      id: 1,
      title: "Meeting with John",
      description: "Discuss project timeline",
      date: "2023-04-02"
    },
    {
      id: 2,
      title: "Lunch with Lisa",
      description: "Catch up on personal matters",
      date: "2023-04-07"
    },
    {
      id: 3,
      title: "Client call",
      description: "Discuss project requirements",
      date: "2023-04-17"
    }
  ];

export const generateDate = (
    month = dayjs().month(),
    year = dayjs().year(),
    events
  ) => {
    const firstDateOfMonth = dayjs().year(year).month(month).date(1).startOf("month");
    const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");
  
    const arrayOfDate = [];
  
    // prefix dates
    const prefixMonth = dayjs().year(year).month(month).subtract(1, "month");
    const lastDateOfPrefixMonth = prefixMonth.endOf("month").date();
    for (let i = lastDateOfPrefixMonth - firstDateOfMonth.day() + 1; i <= lastDateOfPrefixMonth; i++) {
    arrayOfDate.push({
      currentMonth: false,
      date: prefixMonth.date(i),
      events : []
      
    });
  }
  
    // main calendar dates
    for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
        const date = firstDateOfMonth.date(i);
        const dateStr = date.format("YYYY-MM-DD");
        const eventForDate = events.filter((event) => event.date === dateStr);

         arrayOfDate.push({
            date,
            currentMonth: true,
            today: firstDateOfMonth.date(i).toDate().toDateString() === dayjs().toDate().toDateString(),
            events: eventForDate
        });
    }
  
    // suffix dates
    const remainingDays = 7 - lastDateOfMonth.day() - 1;
    for (let i = 1; i <= remainingDays; i++) {
      arrayOfDate.push({
        date: lastDateOfMonth.add(i, 'day'),
        currentMonth: false,
        events: []
      });
    }
  
    return arrayOfDate;
  };
  