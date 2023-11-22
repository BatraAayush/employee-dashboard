import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { DELETE_EMPLOYEE, getData } from "../../redux/actions/employeesActions";
import "./Home.css";

export const Home = () => {
  const [searchedId, setSearchedId] = useState("");
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);
  console.log(employees);
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const deleteHandler = (id) => {
    dispatch({ type: DELETE_EMPLOYEE, payload: id });
  };

  const fileredEmployees = searchedId
    ? employees.filter(({ id }) => Number(id) === Number(searchedId))
    : employees;
  return (
    <div className="home">
      <h1>Employees Dashboard</h1>
      <input
        onChange={(e) => setSearchedId(e.target.value)}
        placeholder="Search By ID"
      />
      <div className="cards-container">
        {fileredEmployees.map(
          ({ id, employee_name, employee_salary, employee_age }) => (
            <div key={id} className="employee-card">
              <Link to={`/details/${id}`}>
                <h3>
                  {id}. {employee_name}
                </h3>
                <p>Age: {employee_age}</p>
                <p>Salary: {employee_salary}</p>
              </Link>
              <button>Edit</button>{" "}
              <button onClick={() => deleteHandler(id)}>Delete</button>
            </div>
          )
        )}
      </div>
    </div>
  );
};
