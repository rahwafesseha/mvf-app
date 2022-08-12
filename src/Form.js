import React, { useState, useEffect } from "react";
import axios from "axios";
import LanguageDisplay from "./LanguageDisplay";
import "./form.css";
import _ from "lodash";

const Form = () => {
  const [username, setUsername] = useState("");
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [usedLanguages, setUsedLanguages] = useState("");
  const languages = {};

  useEffect(() => {
    if (username !== "") {
      axios
        .get(`https://api.github.com/users/${username}/repos`)
        .then((res) => {
          Object.entries(res.data).map(([key, value]) => {
            if (value.language === null) {
              return "";
            }
            if (!languages.hasOwnProperty(value.language)) {
              return (languages[value.language] = 1);
            } else {
              return (languages[value.language] = languages[
                value.language
              ] += 1);
            }
          });
          setData(res.data);
          setUsedLanguages(languages);
        })
        .catch((error) => {
          console.log("error", error);
          setUsedLanguages({});
        });
    }
  }, [username]);

  const handleChange = (event) => {
    // event.preventDefault();
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setUsername(username);
    alert("You have submitted the form.");
    setUsername("");
  };

  return (
    <>
      {data && !usedLanguages
        ? Object.entries(data).map(([key, value]) => (
            <div key={key}>
              <p>{value.language}</p>
            </div>
          ))
        : null}
      {visible && <LanguageDisplay usedLanguages={usedLanguages} />}

      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p> Github username </p>
            <input
              name="username"
              type="text"
              placeholder="Your github username..."
              onChange={(event) => handleChange(event)}
              value={username}
            />
          </label>
        </fieldset>
        <button onClick={() => setVisible(true)} type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;
