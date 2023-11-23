import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  DELETE_EMPLOYEE,
  DELETE_SELECTED_ID_EMPLOYEES,
  getData,
} from "../../redux/actions/employeesActions";
import "./Home.css";

export const Home = () => {
  const [searchedId, setSearchedId] = useState("");
  const [selectedId, setSelectedId] = useState([]);
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  useEffect(() => {
    if(!employees.length)
    dispatch(getData());
  }, [dispatch]);

  const deleteHandler = (id) => {
    dispatch({ type: DELETE_EMPLOYEE, payload: id });
  };

  const fileredEmployees = searchedId
    ? employees.filter(({ id }) => Number(id) === Number(searchedId))
    : employees;

  const checkHandler = (e, id) => {
    if (e.target.checked) {
      setSelectedId([...selectedId, id]);
    } else {
      const updatedSelectedId = selectedId.filter((idx) => idx !== id);
      setSelectedId(updatedSelectedId);
    }
  };

  const deleteSelectedId = () => {
    dispatch({ type: DELETE_SELECTED_ID_EMPLOYEES, payload: selectedId });
    setSelectedId([]);
  };

  if (loading) {
    return (
      <div>
        <h1>Employees Dashboard</h1>
        Loading...
      </div>
    );
  } else if (error) {
    return (
      <div>
        <h1>Employees Dashboard</h1>
        <div className="errors">
          <p><strong>Error: {error}</strong></p>
          <p>Wait for a few minutes and try again</p>
          <p>Backend is unable to handle too many requests</p>
          <p>See console for more info</p> 
        </div>
      </div>
    );
  } else {
    return (
      <div className="home">
        <h1>Employees Dashboard</h1>
        <input
          onChange={(e) => setSearchedId(e.target.value)}
          placeholder="Search By ID"
          className="search-bar"
        />
        <div className="cards-container">
          {fileredEmployees.map(
            ({ id, employee_name, employee_salary, employee_age }) => (
              <div key={id} className="employee-card">
                <input
                  className="checkbox"
                  type="checkbox"
                  onChange={(e) => checkHandler(e, id)}
                />
                <Link to={`/details/${id}`}>
                  <h3>
                    {id}. {employee_name}
                  </h3>
                  <p><strong>Age:</strong> {employee_age}</p>
                  <p><strong>Salary:</strong> Rs. {employee_salary}</p>
                </Link>
                <button>Edit</button>{" "}
                <button onClick={() => deleteHandler(id)}>Delete</button>
              </div>
            )
          )}
        </div>
        {selectedId.length !== 0 && (
          <button
            className="delete-selected-id-btn"
            onClick={() => deleteSelectedId()}
          >
            Delete Selected Id
          </button>
        )}
      </div>
    );
  }
};
