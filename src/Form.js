import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";

const Form = () => {
  const [username, setUsername] = useState("");
  const [data, setData] = useState([]);
  const [usedLanguages, setUsedLanguages] = useState("");
  const languages = {};
  const maxKey = _.max(
    Object.keys(usedLanguages),
    (usedLanguage) => usedLanguages[usedLanguage]
  );

  useEffect(() => {
    if (username !== "") {
      axios
        .get(`https://api.github.com/users/${username}/repos`)
        .then((res) => {
          Object.entries(res.data).map(([key, value]) => {
            console.log({ languages });
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
        });
    }
  }, [username]);

  const handleChange = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const handleClick = (event) => {
    setUsername(username);
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

      {usedLanguages !== undefined && (
        <div>
          <h1>{maxKey}</h1>
        </div>
      )}

      <form>
        <fieldset>
          <label>
            <p>username</p>
            <input
              name="username"
              onChange={(event) => handleChange(event)}
              value={username}
            />
          </label>
        </fieldset>
        <button onClick={handleClick} type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;
