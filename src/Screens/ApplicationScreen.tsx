import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Application {
  id: string;
  applicantName: string;
  applicantTitle: string;
  avatar: string;
  coverLetter: string;
  proposedBudget: string;
  timeline: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedDate: string;
}

const sampleApplications: Application[] = [
  {
    id: '1',
    applicantName: 'John Doe',
    applicantTitle: 'Senior React Native Developer',
    avatar: 'JD',
    coverLetter: 'I am interested in this project and have extensive experience in React Native development...',
    proposedBudget: '$1600',
    timeline: '2 weeks',
    status: 'pending',
    appliedDate: '2 days ago'
  },
  {
    id: '2',
    applicantName: 'Sarah Smith',
    applicantTitle: 'Full Stack Developer',
    avatar: 'SS',
    coverLetter: 'I have built several mobile applications using React Native and can deliver high-quality work...',
    proposedBudget: '$1400',
    timeline: '10 days',
    status: 'accepted',
    appliedDate: '3 days ago'
  },
  {
    id: '3',
    applicantName: 'Mike Johnson',
    applicantTitle: 'Mobile App Developer',
    avatar: 'MJ',
    coverLetter: 'I am confident in my abilities to complete this project on time and within budget...',
    proposedBudget: '$1800',
    timeline: '1 week',
    status: 'pending',
    appliedDate: '1 day ago'
  }
];

const ApplicationsScreen = ({ route }: any) => {
  const { jobId } = route.params || {};
  const [selectedTab, setSelectedTab] = useState('all');

  const tabs = ['all', 'pending', 'accepted', 'rejected'];

  const filteredApps = selectedTab === 'all' 
    ? sampleApplications 
    : sampleApplications.filter(app => app.status === selectedTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#FFB800';
      case 'accepted': return '#2ECC71';
      case 'rejected': return '#FF5B5B';
      default: return '#8A94A6';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'accepted': return 'Accepted';
      case 'rejected': return 'Rejected';
      default: return status;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Applications</Text>
        <Text style={styles.subtitle}>{filteredApps.length} applicants</Text>
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
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredApps}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.applicationCard}>
            <View style={styles.applicantHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.avatar}</Text>
              </View>
              <View style={styles.applicantInfo}>
                <Text style={styles.applicantName}>{item.applicantName}</Text>
                <Text style={styles.applicantTitle}>{item.applicantTitle}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                  {getStatusText(item.status)}
                </Text>
              </View>
            </View>

            <Text style={styles.coverLetter} numberOfLines={3}>
              {item.coverLetter}
            </Text>

            <View style={styles.proposalDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="cash-outline" size={16} color="#8A94A6" />
                <Text style={styles.detailText}>{item.proposedBudget}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="time-outline" size={16} color="#8A94A6" />
                <Text style={styles.detailText}>{item.timeline}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="calendar-outline" size={16} color="#8A94A6" />
                <Text style={styles.detailText}>{item.appliedDate}</Text>
              </View>
            </View>

            <View style={styles.cardActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="person-outline" size={18} color="#3A6FF8" />
                <Text style={styles.actionText}>View Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="chatbubble-outline" size={18} color="#3A6FF8" />
                <Text style={styles.actionText}>Message</Text>
              </TouchableOpacity>
              {item.status === 'pending' && (
                <>
                  <TouchableOpacity style={[styles.actionButton, styles.acceptButton]}>
                    <Ionicons name="checkmark-circle-outline" size={18} color="#2ECC71" />
                    <Text style={[styles.actionText, { color: '#2ECC71' }]}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionButton, styles.rejectButton]}>
                    <Ionicons name="close-circle-outline" size={18} color="#FF5B5B" />
                    <Text style={[styles.actionText, { color: '#FF5B5B' }]}>Reject</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={64} color="#8A94A6" />
            <Text style={styles.emptyText}>No applications found</Text>
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
  subtitle: {
    fontSize: 14,
    color: '#8A94A6',
    marginTop: 4,
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
  applicationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  applicantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3A6FF8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  applicantInfo: {
    flex: 1,
    marginLeft: 12,
  },
  applicantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F1A2A',
  },
  applicantTitle: {
    fontSize: 12,
    color: '#8A94A6',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  coverLetter: {
    fontSize: 14,
    color: '#0F1A2A',
    marginTop: 12,
    lineHeight: 20,
  },
  proposalDetails: {
    flexDirection: 'row',
    marginTop: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontSize: 12,
    color: '#8A94A6',
    marginLeft: 4,
  },
  cardActions: {
    flexDirection: 'row',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F5F7',
    flexWrap: 'wrap',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#3A6FF8',
    marginLeft: 4,
  },
  acceptButton: {},
  rejectButton: {},
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

export default ApplicationsScreen;
