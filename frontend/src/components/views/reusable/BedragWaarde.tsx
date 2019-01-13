import * as React from "react";

export enum Valuta {
  Euro,
  Dollar
}

export enum BedragWaardeKleur {
  Groen = "green",
  Rood = "#ff8888"
}

interface IProps {
  bedrag: number;
  valuta?: Valuta;
  toonMutatie?: boolean;
  geenTeken?: boolean;
  kleurPositief?: string;
  kleurNegatief?: string;
  fontSize?: number;
}

const defaultProps = {
  valuta: Valuta.Euro
} as IProps;

const defaultStyle = (fontSize: number = 16) => ({
  fontSize
} as React.CSSProperties);


const decimalenStyle = (fontSize: number = 16) => ({
  fontSize: fontSize - 4,
  position: "relative",
  bottom: 3,
  marginBottom: -3
} as React.CSSProperties);

const renderValuta = (valuta: Valuta) => {
  switch (valuta) {
    case Valuta.Euro:
      return (
        <span style={{ marginRight: 1 }}>&euro;</span>
      );
    case Valuta.Dollar:
      return (
        <span style={{ marginRight: 1 }}>$</span>
      );
    default:
      throw new Error("Onbekend valuta");
  }
};

const BedragWaarde: React.SFC<IProps> = (props: IProps) => {
  const p = { ...defaultProps, ...props };

  const zonderDecimalen = Math.floor(p.bedrag);
  // const decimalen = ((Math.abs(bedrag) - Math.abs(Math.floor(bedrag))) * 100);
    const decimalen = ((Math.abs(p.bedrag) - Math.floor(Math.abs(p.bedrag))) * 100).toFixed();

  const isNegatief = p.bedrag < 0;
  const positiefStyle = {
    ...defaultStyle(props.fontSize),
    color: props.kleurPositief || BedragWaardeKleur.Groen
  } as React.CSSProperties;

  const negatiefStyle = {
    ...defaultStyle(props.fontSize),
    color: props.kleurNegatief || BedragWaardeKleur.Rood
  } as React.CSSProperties;

  let style = defaultStyle(props.fontSize);
  if (p.toonMutatie) {
    style = isNegatief ? negatiefStyle : positiefStyle;
  }

  const separator = props.valuta === Valuta.Euro ? ',' : '.';

  return (
    <span style={style}>
      {!p.geenTeken &&
      <span>{isNegatief ? "-" : "+"}&nbsp;</span>
      }
      {renderValuta(p.valuta!)}
      <span style={{ textAlign: "right" }}>
          {zonderDecimalen}{separator}
          <span style={decimalenStyle(props.fontSize)}>{decimalen.length === 1 ? `${decimalen}0` : decimalen}</span>
        </span>
      </span>
  );
};

export default BedragWaarde;
