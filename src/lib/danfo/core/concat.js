import { DataFrame } from './frame';
import { Utils } from "./utils";
import { Series } from './series';

const utils = new Utils();


export class Concat {
  constructor(kwargs) {


    // check if keys exist in kwargs
    utils.__in_object(kwargs, "df_list", "df_list not found: specify the list of dataframe");
    utils.__in_object(kwargs, "axis", "axis not found: specify the axis");

    let df_list = null; //set the df_list to null
    let axis = null; // set axis to null
    let indexes = null;

    //check if df_list is an array
    if (Array.isArray(kwargs["df_list"])) {

      df_list = kwargs["df_list"];
    } else {
      throw new Error("df_list must be an Array of dataFrames/Series");
    }

    //check if axis is int and is either 0 or 1
    if (typeof kwargs["axis"] === "number") {

      if (kwargs["axis"] == 0 || kwargs["axis"] == 1) {

        axis = kwargs["axis"];
      } else {
        axis = 1;
        // throw new Error("Invalid axis: axis must be 0 or 1")
      }

    } else {
      throw new Error("axis must be a number");
    }


    let df_object = Object.assign({}, df_list); // convert the array to object
    
    if (axis == 1) {

      let columns = [];
      let duplicate_col_count = {};
      let max_length = 0;
      let a_key = Object.keys(df_object)[0];
      indexes = df_object[a_key].index;
      for (let key in df_object) {

        let column = df_object[key].columns;
        let length = df_object[key].values.length;

        if (length > max_length) {
          max_length = length;
        }

        for (let index in column) {

          let col_name = column[index];
          if (col_name in duplicate_col_count) {

            let count = duplicate_col_count[col_name];
            let name = `${col_name}_${count + 1}`;

            columns.push(name);

            duplicate_col_count[col_name] = count + 1;
          } else {

            columns.push(col_name);
            duplicate_col_count[col_name] = 1;
          }
        }


      }

      let data = new Array(max_length);

      for (let key in df_list) {

        let values = df_list[key].values;

        for (let index = 0; index < values.length; index++) {

          let val = values[index];
          if (typeof data[index] === "undefined") {

            if (Array.isArray(val)){
              data[index] = val;
            } else {
              data[index] = [ val ];
            }

          } else {
            if (Array.isArray(val)){
              data[index].push(...val);
            } else {
              data[index].push(val);
            }

          }
        }

        if (values.length < max_length) {
          let column_length = df_list[key].columns.length;
          let null_array = Array(column_length);

          for (let col = 0; col < column_length; col++) {
            null_array[col] = NaN;
          }

          if (typeof data[max_length - 1] === "undefined") {
            data[max_length - 1] = null_array;
          } else {
            data[max_length - 1].push(...null_array);
          }
        }
      }

      let df = new DataFrame(data, { columns: columns, index: indexes }); //convert to dataframe
      return df;
    } else {
      //concatenate base on axis 0
      let columns = [];
      let row_indexes = [];
      let col_i = 0;
      for (let key in df_list) {
        let column = df_list[key].columns;
        columns.push(...column);
        indexes = df_list[key].index;
        let r_index = indexes.map((val) => {
          return `${val}_row${col_i}`;
        });
        row_indexes.push(...r_index);
        col_i += 1;
      }

      let column_set = new Set(columns);

      columns = Array.from(column_set);

      let data = [];

      for (let key in df_list) {

        let value = df_list[key].values;

        // let col_length = value[0].length

        let df_columns = df_list[key].columns;

        let not_exist = [];
        for (let col_index in columns) {
          let col_name = columns[col_index];

          let is_index = df_columns.indexOf(col_name);

          if (is_index == -1) {
            not_exist.push(col_name);
          }
        }
        if (not_exist.length > 0) {
          for (let i = 0; i < value.length; i++) {
            let row_value = value[i];

            let new_arr = Array(columns.length);
            for (let j = 0; j < columns.length; j++) {

              let col_name = columns[j];
              if (not_exist.includes(col_name)) {

                new_arr[j] = NaN;
              } else {
                let index = df_columns.indexOf(col_name);
                if (Array.isArray(row_value)){
                  new_arr[j] = row_value[index];
                } else {
                  new_arr[j] = row_value;
                }

              }

            }
            data.push(new_arr);
          }
        } else {
          data.push(...value);
        }

      }

      if (Array.isArray(data[0])){
        let df = new DataFrame(data, { columns: columns, index: row_indexes });
        return df;
      } else {
        let sf = new Series(data, { index: row_indexes });
        return sf;
      }


    }

  }
}


/**
* Concatenate pandas objects along a particular axis with optional set logic along the other axes.
* @param {kwargs} {df_list: List of DataFrame to concatenate together axis: 0 for row axis and 1 for index axis
* @returns {DataFrame}
*/
export const concat = (kwargs) => {
  let concat_sf = new Concat(kwargs);
  return concat_sf;
};
