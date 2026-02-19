import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MyJob {
  id: string;
  title: string;
  company: string;
  budget: string;
  tags: string[];
  status: 'open' | 'in-progress' | 'completed';
  applications: number;
}

const sampleMyJobs: MyJob[] = [
  {
    id: '1',
    title: 'Mobile App Developer',
    company: 'Acme Co.',
    budget: '$1500',
    tags: ['React Native', 'TypeScript'],
    status: 'open',
    applications: 5
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'TechCorp',
    budget: '$3000',
    tags: ['Node.js', 'React'],
    status: 'in-progress',
    applications: 12
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'DesignStudio',
    budget: '$1200',
    tags: ['Figma', 'UI Design'],
    status: 'completed',
    applications: 8
  }
];

const MyJobsScreen = ({ navigation }: any) => {
  const [selectedTab, setSelectedTab] = useState('all');

  const tabs = ['all', 'open', 'in-progress', 'completed'];

  const filteredJobs = selectedTab === 'all' 
    ? sampleMyJobs 
    : sampleMyJobs.filter(job => job.status === selectedTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return '#3A6FF8';
      case 'in-progress': return '#FFB800';
      case 'completed': return '#2ECC71';
      default: return '#8A94A6';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'Open';
      case 'in-progress': return 'In Progress';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Jobs</Text>
        <TouchableOpacity 
          style={styles.postButton}
          onPress={() => navigation.navigate('PostJob')}
        >
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.postButtonText}>Post Job</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && styles.tabActive
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[
              styles.tabText,
              selectedTab === tab && styles.tabTextActive
            ]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.jobCard}
            onPress={() => navigation.navigate('Applications', { jobId: item.id })}
          >
            <View style={styles.jobHeader}>
              <View style={styles.jobInfo}>
                <Text style={styles.jobTitle}>{item.title}</Text>
                <Text style={styles.jobCompany}>{item.company}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                  {getStatusText(item.status)}
                </Text>
              </View>
            </View>
            
            <View style={styles.jobDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="cash-outline" size={16} color="#8A94A6" />
                <Text style={styles.detailText}>{item.budget}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="people-outline" size={16} color="#8A94A6" />
                <Text style={styles.detailText}>{item.applications} applications</Text>
              </View>
            </View>

            <View style={styles.tagsContainer}>
              {item.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>

            <View style={styles.cardActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="eye-outline" size={18} color="#3A6FF8" />
                <Text style={styles.actionText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubble-outline" size={18} color="#3A6FF8" />
                <Text style={styles.actionText}>Messages</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="briefcase-outline" size={64} color="#8A94A6" />
            <Text style={styles.emptyText}>No jobs found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F5F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0F1A2A',
  },
  postButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3A6FF8',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  postButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F3F5F7',
  },
  tabActive: {
    backgroundColor: '#3A6FF8',
  },
  tabText: {
    fontSize: 14,
    color: '#8A94A6',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F1A2A',
  },
  jobCompany: {
    fontSize: 14,
    color: '#8A94A6',
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  jobDetails: {
    flexDirection: 'row',
    marginTop: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontSize: 14,
    color: '#8A94A6',
    marginLeft: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F3F5F7',
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#0F1A2A',
  },
  cardActions: {
    flexDirection: 'row',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F5F7',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    fontSize: 14,
    color: '#3A6FF8',
    marginLeft: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#8A94A6',
    marginTop: 12,
  },
});

export default MyJobsScreen;
