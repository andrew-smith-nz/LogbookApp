import {StyleSheet} from 'react-native';

export default StyleSheet.create({

    // Layout
    flexColumn: { flexDirection: 'column' }
    ,flexRow: { flexDirection: 'row' }
    ,leftRow: { flexDirection: 'row', alignItems: 'center', justifyContent:'flex-start' }
    ,centerRow: { flexDirection: 'row', alignItems: 'center', justifyContent:'center' }
    ,rightRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent:'flex-end' }
    ,container: { margin: 5, padding: 5}
    ,wideMargin: {marginLeft:20, marginRight:20}
    ,mainPanel: {flex:1, flexDirection:'column'}
    ,viewBox: { margin:20, backgroundColor:'#ffe7b3', alignItems:'center', justifyContent:'center', borderRadius:10, borderStyle:'solid', borderColor:'#996600', borderWidth:1 }
    ,sideMargins: { marginLeft:10, marginRight:10 }

    // Colors
    ,linkColor: {color:'#4682b4'}
    ,primaryColor: { color: '#006600' }
    ,primaryBackgroundColor: { backgroundColor: '#006600' }
    ,backgroundColor: { color: '#fff7e6' }
    ,backgroundBackgroundColor: { backgroundColor: '#fff7e6' }

    // Text
    ,smallLink: {fontSize: 10, color:'#4682b4'}
    ,smallText: {fontSize: 12 }
    ,centeredText: {textAlign:'center'}
    ,titleText: { textAlign: 'left', fontSize: 20 }
    ,labelText: {fontSize:14, fontWeight:'bold' }
    ,valueText: {fontSize:14 }
    ,boldText18: {fontSize:18, fontWeight:'bold' }
    ,centeredTextSmall: { fontSize:12, textAlign: 'center' }
    ,centeredTextMedium: { fontSize:16, textAlign: 'center' }
    ,centeredTextLarge: { fontSize:24, textAlign: 'center' }
    ,buttonText: { fontSize:24, color:'white', fontWeight:'bold' }
    ,buttonOutlineText: { fontSize:24, color:'#006600', fontWeight:'bold' }
    ,bold: { fontWeight:'bold' }

    // Other controls
    ,input: { flex: 1, backgroundColor:'white', margin: 10, borderStyle:'solid', borderColor:'#cccccc', borderWidth:1, paddingLeft:5, paddingRight:5, paddingTop:0, paddingBottom:0 }
    ,picker: { backgroundColor:'white', paddingLeft:10, borderStyle:'solid', borderColor:'#cccccc', borderWidth:1 }
    ,pickerItem: { marginLeft:10 }
    ,divider: { borderBottomColor: '#004A7F', borderBottomWidth: 1, marginBottom:10 }
    ,horizontalLine: { borderBottomColor: '#004A7F', borderBottomWidth: 1 }
    ,headerLogo: {height:36, width:72, margin:5}
    ,headerBurger: {height:32, width:32, margin:5}
    ,button: { margin:20, padding:10, backgroundColor:'#006600', alignItems:'center', justifyContent:'center', borderRadius:10 }
    ,buttonOutline: { margin:20, padding:10, borderColor:'#006600', borderWidth:2, borderStyle:'solid', alignItems:'center', justifyContent:'center', borderRadius:10 }

    // Decoration (borders etc)
    ,border: { borderColor: 'black', borderWidth:1, borderStyle:'solid'}
    ,tableRow: { borderTopWidth:1, borderTopColor:'black', borderLeftWidth:1, borderLeftColor:'black', borderRightWidth:1, borderRightColor:'black', padding:10 }
    ,tableRowLast: { borderBottomWidth:1, borderBottomColor:'black' }
    
});