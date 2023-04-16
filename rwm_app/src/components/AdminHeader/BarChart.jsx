import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  getDocs,
  getFirestore,
  collection,
  doc,
  setDoc,
  firestore,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import app from "../../contexts/Firebase";
import { useRouter } from "next/router";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const router = useRouter();
  const db = getFirestore(app);
  const [events, setEvents] = useState([]);
  const [oneOffEvents, setOneOffEvents] = useState(0);
  const [weeklyEvents, setWeeklyEvents] = useState(0);
  const [biweeklyEvents, setBiweeklyEvents] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [dailyEvents, setDailyEvents] = useState(0);
  const [monthlyEvents, setMonthlyEvents] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsArray);
        setTotalEvents(eventsArray.length); // Set the total number of events
        setLoading(false);

        // Count the number of events in each category
        let oneOffCount = 0;
        let weeklyCount = 0;
        let biweeklyCount = 0;
        let dailyCount = 0;
        let monthlyCount = 0;

        eventsArray.forEach((event) => {
          switch (event.recurrence) {
            case "one-off":
              oneOffCount++;
              break;
            case "recurrent":
              switch (event.recurrenceFrequency) {
                case "weekly":
                  weeklyCount++;
                  break;
                case "biweekly":
                  biweeklyCount++;
                  break;
                case "daily":
                  dailyCount++;
                  break;
                case "monthly":
                  monthlyCount++;
                  break;
              }
              break;
          }
        });

        // Set the count for each category
        setOneOffEvents(oneOffCount);
        setWeeklyEvents(weeklyCount);
        setBiweeklyEvents(biweeklyCount);
        setDailyEvents(dailyCount);
        setMonthlyEvents(monthlyCount);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ["One-Off", "Daily", "Weekly", "BiWeekly", "Monthly"],
      datasets: [
        {
          label: "Total Running Events",
          data: [
            oneOffEvents,
            dailyEvents,
            weeklyEvents,
            biweeklyEvents,
            monthlyEvents,
          ],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgb(53, 162, 235, 0.4",
        },
      ],
    });
    setChartOptions({
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Recent Number of Running Events",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, []);

  return (
    <>
      <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default BarChart;
