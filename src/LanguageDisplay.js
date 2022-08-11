import React from "react";
import _ from "lodash";

const LanguageDisplay = (props) => {
  const maxKey = _.max(
    Object.keys(props.usedLanguages),
    (usedLanguage) => props.usedLanguages[usedLanguage]
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
