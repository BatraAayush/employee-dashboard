import {
  DELETE_EMPLOYEE,
  DELETE_SELECTED_ID_EMPLOYEES,
  SET_DATA,
  SET_EMPLOYEES_ERROR,
  SET_EMPLOYEES_LOADING,
} from "../actions/employeesActions";

const initialState = {
  employees: [],
  loading: false,
  error: null,
};

export const employeesReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMPLOYEES_LOADING: {
      return { ...state, loading: action.payload };
    }
    case SET_EMPLOYEES_ERROR: {
      return { ...state, error: action.payload, loading: false };
    }
    case SET_DATA: {
      return { ...state, employees: action.payload };
    }
    case DELETE_EMPLOYEE: {
      const updatedEmployees = state.employees.filter(
        ({ id }) => Number(id) !== Number(action.payload)
      );
      return { ...state, employees: updatedEmployees };
    }
    case DELETE_SELECTED_ID_EMPLOYEES: {
      const updatedEmployees = state.employees.filter(({id}) => !action.payload.includes(id));
      return {...state, employees: updatedEmployees}
    }
    default:
      return state;
  }
};
