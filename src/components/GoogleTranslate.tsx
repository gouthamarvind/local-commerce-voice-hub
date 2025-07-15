import { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    // Avoid loading script multiple times
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = function () {
        if (document.getElementById("google_translate_element")) {
          document.getElementById("google_translate_element").innerHTML = "";
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "ml,pa,bn,en,hi,gu,ta,te,or,mr,kok,ks,kn,ne,mni,as,ni,ao",
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            "google_translate_element"
          );
        }
      };

      const script = document.createElement("script");
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
    }
  }, []);

  return <div id="google_translate_element" />;
};

export default GoogleTranslate; 