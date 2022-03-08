export default function WaterBottleImage(props) {
  // eslint-disable-next-line react/prop-types
  let { stroke, fill } = props;
  // eslint-disable-next-line react/prop-types
  stroke = props.stroke != null ? props.stroke : '#000';
  // eslint-disable-next-line react/prop-types
  fill = props.fill != null ? props.fill : '#000';

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270.6 512.89" style={props.sx}>
      <path
        style={{ fill: '#FFF' }}
        d="M478.7,566.39v.31a42.89,42.89,0,0,1-42.9,42.9H264.1a42.89,42.89,0,0,1-42.9-42.9v-.31h-6.55v50h270.6v-50Z"
        transform="translate(-214.65 -103.5)"
      />
      <path
        style={{ fill: 'none', stroke, strokeMiterlimit: 10, strokeWidth: '5px' }}
        d="M435.9,202.7H264.1a42.89,42.89,0,0,0-42.9,42.9V566.7a42.89,42.89,0,0,0,42.9,42.9H435.8a42.89,42.89,0,0,0,42.9-42.9V245.6a42.74,42.74,0,0,0-42.8-42.9Z"
        transform="translate(-214.65 -103.5)"
      />
      <path
        style={{ stroke, fill }}
        d="M415.9,123.7H371.5v-5.2a15,15,0,0,0-15-15H343.6a15,15,0,0,0-15,15v5.2H284.2a20.06,20.06,0,0,0-20,20v47.2H435.9V143.7A20,20,0,0,0,415.9,123.7Z"
        transform="translate(-214.65 -103.5)"
      />
    </svg>
  );
}
