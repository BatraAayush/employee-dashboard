import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import "./Details.css";
import { DELETE_EMPLOYEE } from "../../redux/actions/employeesActions";
import { Link } from "react-router-dom";

function Details() {
  const { id } = useParams();
  const employees = useSelector((state) => state.employees);
  const employee = employees.find((emp) => Number(emp.id) === Number(id));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteHandler = (id) => {
    navigate("/");
    dispatch({ type: DELETE_EMPLOYEE, payload: id });
  };
  return (
    <div className="details">
      <Link to={"/"}>Back to Home</Link>
      <h1>Employee Details</h1>
      <div className="employee_data">
        <p>
          <strong>ID:</strong> {employee.id}
        </p>
        <p>
          <strong>Name:</strong> {employee.employee_name}
        </p>
        <p>
          <strong>Age:</strong> {employee.employee_age}
        </p>
        <p>
          <strong>Salary:</strong> {employee.employee_salary}
        </p>
        <button>Edit</button>{" "}
        <button onClick={() => deleteHandler(employee.id)}>Delete</button>
      </div>
    </div>
  );
}

export default Details;
