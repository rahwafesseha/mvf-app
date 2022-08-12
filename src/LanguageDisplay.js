import React from "react";
import _ from "lodash";

const LanguageDisplay = (props) => {
  const maxKey = Object.keys(props.usedLanguages).reduce(
    (a, b) => (props.usedLanguages[a] > props.usedLanguages[b] ? a : b),
    0
  );

  return (
    props.usedLanguages !== undefined && (
      <div>
        <h1 className="fav-language">{`Favorite Language: ${maxKey}`}</h1>
      </div>
    )
  );
};

export default LanguageDisplay;
