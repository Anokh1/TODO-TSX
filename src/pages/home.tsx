import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { clearField } from "../utils/clearField";
import { addTodo } from "../services/create";
import Navbar from "../components/navbar";
import { countStatus } from "../services/read";
import { DoughnutChart } from "../components/chart";
import BasicDemo from "../components/treetable";

export default function Home() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [done, setDone] = useState<number>(0);

  const [completed, setCompleted] = useState<number>(0);
  const [inProgress, setInProgress] = useState<number>(0);

  const toastRef = useRef<Toast>(null);

  // Handler function for the submit button
  const handleSubmit = () => {
    addTodo({
      name,
      title,
      description,
      done,
    })
      .then(() => {
        if (toastRef.current != null) {
          toastRef.current.show({
            severity: "success",
            summary: "Information added",
            detail: "Please complete your todo",
          });
          setTimeout(function () {
            clearField({
              setName,
              setTitle,
              setDescription,
            });
          }, 300);
        }
      })
      .catch((error) => {
        if (toastRef.current != null) {
          toastRef.current.show({
            severity: "error",
            summary: "Insufficient information",
            detail: "Please input missing information",
          });
        }
      });
  };

  useEffect(() => {
    countStatus({ value: 0 }).then((count) => {
      setInProgress(count);
    });
    countStatus({ value: 1 }).then((count) => {
      setCompleted(count);
    });
  }, []);

  const chartData = {
    labels: ["In Progress", "Completed"],
    datasets: [
      {
        data: [inProgress, completed],
        backgroundColor: ["#CCCCCC", "#007AD9"],
      },
    ],
  };

  return (
    <div>
      <Navbar />
      <Toast ref={toastRef}></Toast>
      <div className="section">
        <div className="left-section">
          <BasicDemo />
        </div>
        <div className="mid-section">
          <div className="container">
            <h1>T O D O</h1>
            <span className="p-float-label input">
              <InputText id="name" onChange={(e) => setName(e.target.value)} />
              <label htmlFor="input_value">Name</label>
            </span>
            <span className="p-float-label input">
              <InputText
                id="title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="input_value">Title</label>
            </span>
            <span className="p-float-label">
              <InputTextarea
                id="todo"
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                cols={22}
              />
              <label htmlFor="description">Description</label>
            </span>
            <br />
            <Button type="submit" onClick={handleSubmit} label="Submit" />
          </div>
        </div>
        <div className="right-section">
          <DoughnutChart chartData={chartData} />
        </div>
      </div>
    </div>
  );
}
