import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PrimaryButton } from '../components/PrimaryButton';

interface JobDetailsProps {
  route: any;
  navigation: any;
}

const JobDetailsScreen = ({ route, navigation }: JobDetailsProps) => {
  const { job } = route.params || {};
  const [hasApplied, setHasApplied] = useState(false);

  const handleApply = () => {
    Alert.alert(
      'Apply for Job',
      `Are you sure you want to apply for "${job?.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Apply', 
          onPress: () => {
            setHasApplied(true);
            Alert.alert('Success', 'Your application has been submitted!');
          }
        },
      ]
    );
  };

  if (!job) {
    return (
      <View style={styles.container}>
        <Text>No job details available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.jobHeader}>
            <Text style={styles.title}>{job.title}</Text>
            <View style={styles.companyRow}>
              <Ionicons name="business" size={16} color="#8A94A6" />
              <Text style={styles.company}>{job.company}</Text>
            </View>
          </View>
          <View style={styles.budgetContainer}>
            <Text style={styles.budgetLabel}>Budget</Text>
            <Text style={styles.budget}>{job.budget}</Text>
          </View>
        </View>

        <View style={styles.tagsContainer}>
          {job.tags.map((tag: string, index: number) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Description</Text>
          <Text style={styles.description}>{job.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requirements</Text>
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={20} color="#2ECC71" />
            <Text style={styles.requirementText}>Proven experience in relevant field</Text>
          </View>
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={20} color="#2ECC71" />
            <Text style={styles.requirementText}>Strong communication skills</Text>
          </View>
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={20} color="#2ECC71" />
            <Text style={styles.requirementText}>Ability to meet deadlines</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Posted</Text>
          <Text style={styles.postedDate}>{job.postedDate}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About the Client</Text>
          <View style={styles.clientInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{job.company.charAt(0)}</Text>
            </View>
            <View style={styles.clientDetails}>
              <Text style={styles.clientName}>{job.company}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#FFB800" />
                <Text style={styles.rating}>4.8 (25 reviews)</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          {hasApplied ? (
            <View style={styles.appliedContainer}>
              <Ionicons name="checkmark-circle" size={24} color="#2ECC71" />
              <Text style={styles.appliedText}>Application Submitted</Text>
            </View>
          ) : (
            <PrimaryButton 
              title="Apply Now" 
              onPress={handleApply}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F5F7',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  jobHeader: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0F1A2A',
    marginBottom: 8,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  company: {
    fontSize: 14,
    color: '#8A94A6',
    marginLeft: 4,
  },
  budgetContainer: {
    alignItems: 'flex-end',
  },
  budgetLabel: {
    fontSize: 12,
    color: '#8A94A6',
  },
  budget: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3A6FF8',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    backgroundColor: '#fff',
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F3F5F7',
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#0F1A2A',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F1A2A',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#0F1A2A',
    lineHeight: 22,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 14,
    color: '#0F1A2A',
    marginLeft: 8,
  },
  postedDate: {
    fontSize: 14,
    color: '#8A94A6',
  },
  clientInfo: {
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
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  clientDetails: {
    marginLeft: 12,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F1A2A',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    fontSize: 12,
    color: '#8A94A6',
    marginLeft: 4,
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  appliedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#E8F8F0',
    borderRadius: 12,
  },
  appliedText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2ECC71',
    marginLeft: 8,
  },
});

export default JobDetailsScreen;
