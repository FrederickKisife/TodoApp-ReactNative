import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, Alert} from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';

export default function App() {
  const [todos, setTodos] = useState([
    {text: 'Do some exercise', key:'1'},
    {text: 'Take a bath', key:'2'},
    {text: 'Have some breakfast', key:'3'},
  ]);

  const pressHandler =(key)=>{
    setTodos((prevTodos)=>{
      return prevTodos.filter(todo => todo.key != key)
    })
  }

  const submitHandler = (text)=>{

    if(text.length > 3){
      setTodos((prevTodos)=>{
        return [
          {text: text, key: Math.random().toString()},
          ...prevTodos
        ]
      })
    }else{
      Alert.alert("OOOOOOH!", "Todos must be over 3 characters long", [
        {text: 'Understood', onPress: ()=>console.log('alert close')}
      ])
    }
  
  }

  return (
    <View style={styles.container}>
      <Header/>
      <View style={styles.content}>
        <AddTodo submitHandler={submitHandler}/>
        <View style={styles.list}>
          <FlatList
           data={todos}
           renderItem={({item})=>(
            <TodoItem item={item} pressHandler={pressHandler}/>
           )}
          />
        </View>
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content:{
    padding:40,
  },
  list:{
    marginTop: 20,
  }
});
