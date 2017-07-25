import {StyleSheet} from 'react-native';

export default StyleSheet.create({

    flexColumn: { flexDirection: 'column' },
    flexRow: { flexDirection: 'row', alignItems: 'center', justifyContent:'center' },
    rightRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent:'flex-end' },
    input: { flex: 1, margin: 10, borderStyle:'solid', borderColor:'#cccccc', borderWidth:1, paddingLeft:5, paddingRight:5, paddingTop:0, paddingBottom:0 },
    container: { margin: 5, padding: 5},
    smallLink: {fontSize: 10, color:'#4682b4'},
    link: {color:'#4682b4'},
    centeredText: {textAlign:'center'},
});