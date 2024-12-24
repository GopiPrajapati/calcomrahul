import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  LogBox,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useTaskContext} from '../context/AppContext';

const TaskListScreen: FC = ({navigation}) => {
  const {setTasks, tasks} = useTaskContext();

  const [selectedDate, setSelectedDate] = useState(tasks[0]?.date);

  const ref = useRef<FlatList | null>(null);
  const sectionListRef = useRef<SectionList | null>(null);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const dates = useMemo(
    () => Array.from(new Set(tasks.map(task => task.date))),
    [tasks],
  );

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          ref={ref}
          data={dates}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={
                selectedDate === item ? styles.selectedDate : styles.dateButton
              }
              onPress={() => {
                ref.current?.scrollToIndex({index, viewPosition: 0.5});
                sectionListRef.current?.scrollToLocation({
                  itemIndex: 2,
                  sectionIndex: index,
                });
                setSelectedDate(item);
              }}>
              <Text style={styles.dateText}>
                {Intl.DateTimeFormat('en-IN', {
                  weekday: 'short',
                }).format(new Date(item))}
              </Text>
              <Text style={styles.dateText}>
                {Intl.DateTimeFormat('en-IN', {
                  day: '2-digit',
                }).format(new Date(item))}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Section List */}
      <SectionList
        ref={sectionListRef}
        sections={dates.map(date => ({
          title: date,
          data: tasks.filter(task => task.date === date),
        }))}
        keyExtractor={item => item.id}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.sectionHeader}>
            {new Date(title).toDateString()}
          </Text>
        )}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.taskItem}
            onPress={() => navigation.navigate('TaskDetails', {task: item})}>
            <Text style={styles.taskName}>{item.name}</Text>
            <Text style={styles.taskDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          navigation.navigate('CreateTask', {
            onTaskSave: (newTask: any) =>
              setTasks(prevTasks => [...prevTasks, newTask]),
          })
        }>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  dateButton: {
    padding: 10,
    margin: 1,
    marginHorizontal: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  selectedDate: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  dateText: {
    color: '#fff',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  taskItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginVertical: 5,
    borderRadius: 5,
  },
  taskName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: '#555',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007bff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: {
    color: '#fff',
    fontSize: 24,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});
