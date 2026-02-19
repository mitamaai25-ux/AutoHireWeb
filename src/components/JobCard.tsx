import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const JobCard = ({ title, company, budget, tags }: any) => (
  <View style={styles.card}>
    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.company}>{company}</Text>
      </View>
      <Text style={styles.budget}>{budget}</Text>
    </View>
    <View style={styles.tagRow}>{tags.map((t:string,i:number)=>(<View key={i} style={styles.chip}><Text style={styles.chipText}>{t}</Text></View>))}</View>
    <TouchableOpacity style={styles.applyBtn}><Text style={{color:'#fff'}}>Quick Apply</Text></TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: { backgroundColor:'#fff', padding:16, borderRadius:12, elevation:2, shadowColor:'#0F1A2A', marginBottom:12 },
  title: { fontSize:16, fontWeight:'600' },
  company: { fontSize:13, color:'#8A94A6' },
  budget: { fontSize:14, fontWeight:'600' },
  tagRow: { flexDirection:'row', marginTop:8, flexWrap:'wrap' },
  chip: { paddingHorizontal:8, paddingVertical:4, borderRadius:8, backgroundColor:'#F3F5F7', marginRight:8, marginTop:6 },
  chipText: { fontSize:12, color:'#263238' },
  applyBtn: { marginTop:12, alignSelf:'flex-start', backgroundColor:'#3A6FF8', paddingVertical:8, paddingHorizontal:12, borderRadius:8 }
});
