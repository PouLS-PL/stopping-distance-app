export const translations = {
  en: {
    test: "English text",
    settingsTitle: "Settings",
    unitsTitle: "Units",
    incline: "Incline: ",
    appSettings: "App settings",
    deceleration: `Deceleration [m/s²]`,
    reactionTime: "Reaction time [s] ",
    altCalcMethod:
      "Calculate deceleration based on braking force and vehicle mass",
    brakingForce: "Braking force [N] ",
    mass: "Total vehicle mass [kg] ",
    back: "Back",
    unitNames: {
      speed: {
        "km/h": "kilometres per hour (km/h)",
        "m/s": "metres per second (m/s)",
        mph: "miles per hour (mi/h)",
      },
      stoppingDistance: {
        m: "metres (m)",
        ft: "feet (ft)",
        sv: "seconds at current speed (s)",
        cars: "4-metre car lengths (cars)",
      },
      incline: {
        "%": "percentage (%)",
        "°": "degrees (°)",
      },
      deceleration: {
        "m/s²": "metres per second squared (m/s²)",
        g: "standard gravity (g)",
      },
      reactionTime: {
        s: "seconds (s)",
      },
      brakingForce: {
        N: "newtons (N)",
        kgf: "kilograms-force (kgf)",
        lbf: "pounds-force (lbf)",
      },
      mass: {
        kg: "kilograms (kg)",
        t: "tonnes (t)",
        lb: "pounds (lb)",
      },
    },
    inclineModal: (
      <>
        Nachylenie: Nachylenie podłużne w procentach (dodatnie wartości:
        wzniesienie; ujemne wartości: spadek).
        <br />
        <br />
        -37,45%: najbardziej stromy zjazd na świecie
        <br />
        -10%: minimalny spadek w terenie górzystym do umieszczenia znaku A-22 w
        Polsce
        <br />
        -7%: minimalny spadek poza terenem górzystym do umieszczenia znaku A-22
        w Polsce
        <br />
        0%: droga pozioma
        <br />
        ±3%: jeśli wartość nachylenia jest większa, na szlaku rowerowym
        umieszcza się tabliczkę informującą o nachyleniu (w Polsce)
        <br />
        6%: minimalne wzniesienie poza terenem górzystym do umieszczenia znaku
        A-23 w Polsce
        <br />
        8%: minimalne wzniesienie w terenie górzystym do umieszczenia znaku A-23
        w Polsce
        <br />
        5,5° ≈ 9,6%: maksymalne wzniesienie na egzaminie w Polsce
        <br />
        12%: zespół pojazdów składający się z samochodu osobowego i przyczepy,
        obciążonych do wartości maksymalnych mas całkowitych, powinien ruszyć z
        miejsca co najmniej 5 razy w czasie 5 minut pod wzniesienie o tym
        nachyleniu (w Polsce)
        <br />
        ±28%: najbardziej stromy podjazd/zjazd w Polsce
        <br />
        35%: najbardziej stromy podjazd na świecie
        <br />
      </>
    ),
    surfaceModal: (
      <>
        <strong>Stan nawierzchni</strong> (μ — współczynnik tarcia)
        <br />
        <img
          className="modal-condition-icon"
          src="/weather_symbols_sunny.png"
        />{" "}
        suchy i szorstki asfalt (μ = 0,9)
        <br />
        <img className="modal-condition-icon" src="/heap-of-sand.png" />{" "}
        zabrudzony piachem asfalt (μ = 0,55)
        <br />
        <img
          className="modal-condition-icon"
          src="/weather_symbols_rain.png"
        />{" "}
        mokry asfalt (μ = 0,45)
        <br />
        <img
          className="modal-condition-icon"
          src="/weather_symbols_snow.png"
        />{" "}
        pokryty śniegiem asfalt (μ = 0,25)
        <br />
        <img className="modal-condition-icon" src="/A-32.png" /> bardzo śliski
        asfalt, oblodzony asfalt, gołoledź (μ = 0,1)
        <br />
      </>
    ),
    decelerationModal: (
      <>
        Opóźnienie: Opóźnienie pojazdu na drodze poziomej o nawierzchni twardej,
        suchej i czystej.
        <br />
        <br />
        0,4g ≈ 3,92 m/s/s - minimalna wartość dla maksymalnie obciążonego
        pojazdu samochodowego w Polsce
        <br />
        <br />
        0,58g ≈ 5,68 m/s/s - minimalna wartość dla maksymalnie obciążonego
        pojazdu kat. M1 (osobówka) zarejestrowanego po 2010 r. w Polsce
        <br />8 m/s/s ≈ 0,81g - nowoczesny samochód
        <br />9 m/s/s ≈ 0,91g - samochód sportowy
      </>
    ),
    reactionTimeModal: (
      <>
        Czas reakcji: Suma czasu reakcji kierującego na bodziec, czasu potrzebny
        na aktywowanie hamulca i czas reakcji układu hamulcowego.
        <br />
        <br />
        Czas reakcji trzeźwego kierującego to około 0,6—0,85 s
        <br />
        Reakcja układu hamulcowego to około 0,2—0,5 s
        <br />
        Zalecana wartość: 1,35 s
      </>
    ),
    brakingForceModal: (
      <>
        Siła hamowania: Siła hamowania pojazdu na drodze poziomej o nawierzchni
        twardej, suchej i czystej.
        <br />
        <br />
        14 210—14 500 N: minimalna wartość dla pojazdu o kat. M1 (osobówka) o
        DMC 2,5 t zarejestrowanego po 2010 r. w Polsce
      </>
    ),
    massModal: (
      <>
        Rzeczywista masa całkowita: masa pojazdu łącznie z masą znajdujących się
        na nim rzeczy i osób.
        <br />
        <br />
        1179 kg — pusty Hyundai i30 GDH 1820 kg — maksymalnie obciążony Hyundai
        i30 GDH{" "}
      </>
    ),
  },
  pl: {
    test: "polski tekst",
    settingsTitle: "Ustawienia",
    unitsTitle: "Jednostki",
    incline: "Nachylenie: ",
    appSettings: "Ustawienia aplikacji",
    deceleration: `Opóźnienie [m/s²]`,
    reactionTime: "Czas reakcji [s] ",
    altCalcMethod: "Oblicz opóźnienie na podstawie siły hamowania i RMC",
    brakingForce: "Siła hamowania [N] ",
    mass: "Rzeczywista masa całkowita [kg] ",
    back: "Powrót",
    unitNames: {
      speed: {
        "km/h": "kilometry na godzinę (km/h)",
        "m/s": "metry na sekundę (m/s)",
        mph: "mile na godzinę (mi/h)",
      },
      stoppingDistance: {
        m: "metry (m)",
        ft: "stopy (ft)",
        sv: "sekundy przy obecnej prędkości (s)",
        cars: "długości 4-metrowych samochodów (sam.)",
      },
      incline: {
        "%": "procenty (%)",
        "°": "stopnie (°)",
      },
      deceleration: {
        "m/s²": "metry na sekundę kwadrat (m/s²)",
        g: "przyspieszenie ziemskie (g)",
      },
      reactionTime: {
        s: "sekundy (s)",
      },
      brakingForce: {
        N: "niutony (N)",
        kgf: "kilogram-siła (kgf)",
        lbf: "funt-siła (lbf)",
      },
      mass: {
        kg: "kilogramy (kg)",
        t: "tony (t)",
        lb: "funty (lb)",
      },
    },
    inclineModal: (
      <>
        Nachylenie: Nachylenie podłużne w procentach (dodatnie wartości:
        wzniesienie; ujemne wartości: spadek).
        <br />
        <br />
        -37,45%: najbardziej stromy zjazd na świecie
        <br />
        -10%: minimalny spadek w terenie górzystym do umieszczenia znaku A-22 w
        Polsce
        <br />
        -7%: minimalny spadek poza terenem górzystym do umieszczenia znaku A-22
        w Polsce
        <br />
        0%: droga pozioma
        <br />
        ±3%: jeśli wartość nachylenia jest większa, na szlaku rowerowym
        umieszcza się tabliczkę informującą o nachyleniu (w Polsce)
        <br />
        6%: minimalne wzniesienie poza terenem górzystym do umieszczenia znaku
        A-23 w Polsce
        <br />
        8%: minimalne wzniesienie w terenie górzystym do umieszczenia znaku A-23
        w Polsce
        <br />
        5,5° ≈ 9,6%: maksymalne wzniesienie na egzaminie w Polsce
        <br />
        12%: zespół pojazdów składający się z samochodu osobowego i przyczepy,
        obciążonych do wartości maksymalnych mas całkowitych, powinien ruszyć z
        miejsca co najmniej 5 razy w czasie 5 minut pod wzniesienie o tym
        nachyleniu (w Polsce)
        <br />
        ±28%: najbardziej stromy podjazd/zjazd w Polsce
        <br />
        35%: najbardziej stromy podjazd na świecie
        <br />
      </>
    ),
    surfaceModal: (
      <>
        <strong>Stan nawierzchni</strong> (μ — współczynnik tarcia)
        <br />
        <img
          className="modal-condition-icon"
          src="/weather_symbols_sunny.png"
        />{" "}
        suchy i szorstki asfalt (μ = 0,9)
        <br />
        <img className="modal-condition-icon" src="/heap-of-sand.png" />{" "}
        zabrudzony piachem asfalt (μ = 0,55)
        <br />
        <img
          className="modal-condition-icon"
          src="/weather_symbols_rain.png"
        />{" "}
        mokry asfalt (μ = 0,45)
        <br />
        <img
          className="modal-condition-icon"
          src="/weather_symbols_snow.png"
        />{" "}
        pokryty śniegiem asfalt (μ = 0,25)
        <br />
        <img className="modal-condition-icon" src="/A-32.png" /> bardzo śliski
        asfalt, oblodzony asfalt, gołoledź (μ = 0,1)
        <br />
      </>
    ),
    decelerationModal: (
      <>
        Opóźnienie: Opóźnienie pojazdu na drodze poziomej o nawierzchni twardej,
        suchej i czystej.
        <br />
        <br />
        0,4g ≈ 3,92 m/s/s - minimalna wartość dla maksymalnie obciążonego
        pojazdu samochodowego w Polsce
        <br />
        <br />
        0,58g ≈ 5,68 m/s/s - minimalna wartość dla maksymalnie obciążonego
        pojazdu kat. M1 (osobówka) zarejestrowanego po 2010 r. w Polsce
        <br />8 m/s/s ≈ 0,81g - nowoczesny samochód
        <br />9 m/s/s ≈ 0,91g - samochód sportowy
      </>
    ),
    reactionTimeModal: (
      <>
        Czas reakcji: Suma czasu reakcji kierującego na bodziec, czasu potrzebny
        na aktywowanie hamulca i czas reakcji układu hamulcowego.
        <br />
        <br />
        Czas reakcji trzeźwego kierującego to około 0,6—0,85 s
        <br />
        Reakcja układu hamulcowego to około 0,2—0,5 s
        <br />
        Zalecana wartość: 1,35 s
      </>
    ),
    brakingForceModal: (
      <>
        Siła hamowania: Siła hamowania pojazdu na drodze poziomej o nawierzchni
        twardej, suchej i czystej.
        <br />
        <br />
        14 210—14 500 N: minimalna wartość dla pojazdu o kat. M1 (osobówka) o
        DMC 2,5 t zarejestrowanego po 2010 r. w Polsce
      </>
    ),
    massModal: (
      <>
        Rzeczywista masa całkowita: masa pojazdu łącznie z masą znajdujących się
        na nim rzeczy i osób.
        <br />
        <br />
        1179 kg — pusty Hyundai i30 GDH 1820 kg — maksymalnie obciążony Hyundai
        i30 GDH{" "}
      </>
    ),
  },
};
