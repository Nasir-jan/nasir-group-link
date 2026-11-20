export interface GroupItem {
  id: string;
  name: string;
  members: number;
  category: string;
  description: string;
  whatsappUrl: string;
  iconKey: 'friends' | 'videos' | 'cricket' | 'study';
  accentClass: string;
}

export const WHATSAPP_GROUPS: GroupItem[] = [
  {
    id: 'nasir-friends-group',
    name: 'Nasir Friends Group',
    members: 1200,
    category: 'Friends & Chat',
    description: 'Daily hangout, dosti, and friendly conversations.',
    whatsappUrl: 'https://chat.whatsapp.com/NasirFriendsGroupOfficial',
    iconKey: 'friends',
    accentClass: 'bg-emerald-50 text-emerald-700',
  },
  {
    id: 'funny-videos-group',
    name: 'Funny Videos Group',
    members: 850,
    category: 'Entertainment',
    description: 'Clean comedy clips, memes, and daily laugh reels.',
    whatsappUrl: 'https://chat.whatsapp.com/FunnyVideosGroupOfficial',
    iconKey: 'videos',
    accentClass: 'bg-amber-50 text-amber-700',
  },
  {
    id: 'cricket-fans-group',
    name: 'Cricket Fans Group',
    members: 2100,
    category: 'Sports',
    description: 'Live match discussions, scores, and highlights.',
    whatsappUrl: 'https://chat.whatsapp.com/CricketFansGroupOfficial',
    iconKey: 'cricket',
    accentClass: 'bg-sky-50 text-sky-700',
  },
  {
    id: 'study-group',
    name: 'Study Group',
    members: 500,
    category: 'Education',
    description: 'Notes sharing, exam tips, and study motivation.',
    whatsappUrl: 'https://chat.whatsapp.com/StudyGroupOfficial',
    iconKey: 'study',
    accentClass: 'bg-teal-50 text-teal-700',
  },
];
