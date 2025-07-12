import {
  users,
  posts,
  type User,
  type InsertUser,
  type Post,
  type InsertPost
} from '@shared/schema'

export interface IStorage {
  getUser(id: number): Promise<User | undefined>
  getUserByUsername(username: string): Promise<User | undefined>
  createUser(user: InsertUser): Promise<User>

  getPosts(limit?: number, offset?: number): Promise<Post[]>
  getPostsByType(type: string, limit?: number, offset?: number): Promise<Post[]>
  getPostById(id: number): Promise<Post | undefined>
  createPost(post: InsertPost): Promise<Post>
  searchPosts(query: string): Promise<Post[]>
  incrementViewCount(id: number): Promise<void>
  getPostsByDateRange(startDate: Date, endDate: Date): Promise<Post[]>
}

export class MemStorage implements IStorage {
  private users: Map<number, User>
  private posts: Map<number, Post>
  private currentUserId: number
  private currentPostId: number

  constructor () {
    this.users = new Map()
    this.posts = new Map()
    this.currentUserId = 1
    this.currentPostId = 1

    // ✅ initialize posts async
    this.initializeSampleData().catch(console.error)
  }

  // ✅ async with for...of loop
  private async initializeSampleData () {
    const samplePosts: InsertPost[] = [
      {
        title: 'Gaza Under Siege: Humanitarian Crisis Deepens',
        content:
          'Palestinian civilians face ongoing blockade and restricted access to essential supplies including food, medical aid, and fuel. International observers report deteriorating living conditions.',
        type: 'breaking',
        source: 'Palestinian Media',
        author: 'Gaza Reporter',
        tags: ['Gaza', 'humanitarian', 'siege', 'Palestine'],
        isBreaking: true
      },
      {
        title: '75 Years of Occupation: Historical Analysis',
        content:
          'Since 1948, Palestinians have endured systematic displacement, land confiscation, and military occupation. This analysis examines the root causes and ongoing impacts of colonization.',
        type: 'analysis',
        source: 'Institute for Palestine Studies',
        author: 'Dr. Rashid Khalidi',
        tags: ['occupation', 'history', '1948', 'displacement'],
        isBreaking: false
      },
      {
        title: 'The world cannot remain silent while Palestinians suffer',
        content:
          'We call on the international community to hold Israel accountable for its violations of international law and human rights abuses against the Palestinian people.',
        type: 'quote',
        source: 'PLO Statement',
        author: 'Palestinian Leadership Council',
        tags: ['international law', 'accountability', 'human rights'],
        isBreaking: false
      },
      {
        title: 'West Bank Settlements Expand Despite International Law',
        content:
          'Israeli settlements continue expanding in the occupied West Bank, violating the Fourth Geneva Convention and UN resolutions. Palestinian families face forced evictions.',
        type: 'breaking',
        source: "B'Tselem",
        author: 'Human Rights Monitor',
        tags: ['settlements', 'West Bank', 'international law', 'evictions'],
        isBreaking: true
      },
      {
        title: 'Media Bias: How Western Coverage Distorts Palestinian Reality',
        content:
          'Analysis of major news outlets reveals systematic bias in reporting that obscures Palestinian suffering and perpetuates misleading narratives about the occupation.',
        type: 'analysis',
        source: 'Media Monitoring Organization',
        author: 'Dr. Amira Hass',
        tags: ['media bias', 'propaganda', 'narrative', 'journalism'],
        isBreaking: false
      },
      {
        title: 'This is not a conflict between equals - this is an occupation',
        content:
          "The language of 'conflict' masks the reality of military occupation and systematic oppression. We must call it what it is: apartheid.",
        type: 'quote',
        source: 'UN Special Rapporteur',
        author: 'Michael Lynk',
        tags: ['occupation', 'apartheid', 'UN', 'terminology'],
        isBreaking: false
      },
      {
        title: 'Jerusalem: Sacred City Under Threat',
        content:
          'Palestinian families in Sheikh Jarrah and Silwan face forced displacement as Israeli authorities implement policies to change the demographic composition of East Jerusalem.',
        type: 'timeline',
        source: 'Al-Haq',
        author: 'Human Rights Lawyer',
        tags: ['Jerusalem', 'Sheikh Jarrah', 'displacement', 'demographics'],
        isBreaking: false
      },
      {
        title: 'Israeli Officials Admit to Targeting Civilians',
        content:
          'Internal documents and recorded statements reveal deliberate targeting of Palestinian civilian infrastructure and population centers, contradicting official claims.',
        type: 'breaking',
        source: 'Investigative Report',
        author: 'Whistleblower Documents',
        tags: ['war crimes', 'targeting civilians', 'documentation'],
        isBreaking: true
      },
      {
        title: 'Children of Gaza: A Generation Traumatized',
        content:
          'UNICEF reports highlight the severe psychological trauma experienced by children in Gaza due to constant bombardments, loss of family members, and lack of safety.',
        type: 'analysis',
        source: 'UNICEF',
        author: 'UN Child Rights Expert',
        tags: ['children', 'trauma', 'Gaza', 'psychology'],
        isBreaking: false
      },
      {
        title: 'Doctors Operate Under Fire in Gaza Hospitals',
        content:
          'Hospitals in Gaza are overwhelmed and running on backup generators. Medical workers risk their lives as health facilities are targeted and supplies run out.',
        type: 'breaking',
        source: 'Doctors Without Borders',
        author: 'Medical Aid Team',
        tags: ['hospitals', 'health crisis', 'Gaza', 'emergency'],
        isBreaking: true
      },
      {
        title: 'Palestinian Voices Censored on Social Media Platforms',
        content:
          'Digital rights groups reveal systematic suppression of Palestinian content by major social media platforms, citing bias in content moderation policies.',
        type: 'analysis',
        source: 'Electronic Frontier Foundation',
        author: 'Digital Rights Watch',
        tags: ['censorship', 'social media', 'digital rights'],
        isBreaking: false
      },
      {
        title: '"We Will Rebuild": Voices from Rubble in Rafah',
        content:
          'Despite losing their homes and loved ones, residents of Rafah vow to rebuild their lives. “We have no other choice but to stand again,” says a local survivor.',
        type: 'quote',
        source: 'Al Jazeera Interviews',
        author: 'Survivors of Rafah',
        tags: ['resilience', 'Rafah', 'reconstruction', 'hope'],
        isBreaking: false
      },
      {
        title: 'Timeline of Major UN Resolutions on Palestine (1947–Present)',
        content:
          'This timeline summarizes key UN resolutions affecting Palestinian self-determination, refugees, occupation, and statehood over the last 75+ years.',
        type: 'timeline',
        source: 'UN Archives',
        author: 'International Affairs Analyst',
        tags: ['UN', 'resolutions', 'timeline', 'Palestinian statehood'],
        isBreaking: false
      },
      {
        title: 'Eyewitness Accounts: White Phosphorus Used in Civilian Areas',
        content:
          'Civilians and rights groups report the use of white phosphorus munitions in densely populated areas, raising serious concerns of war crimes.',
        type: 'breaking',
        source: 'Human Rights Watch',
        author: 'Field Investigators',
        tags: ['phosphorus', 'war crimes', 'Gaza', 'chemical weapons'],
        isBreaking: true
      },
      {
        title: 'International Lawyers Call for Israeli War Crimes Trial',
        content:
          'A coalition of international legal experts submits evidence to the ICC, urging immediate investigation into violations of the Geneva Conventions.',
        type: 'analysis',
        source: 'ICC Dossier',
        author: 'Global Legal Coalition',
        tags: ['ICC', 'Geneva Convention', 'legal', 'war crimes'],
        isBreaking: false
      }
    ]

    for (const post of samplePosts) {
      await this.createPost(post)
    }
  }

  async getUser (id: number): Promise<User | undefined> {
    return this.users.get(id)
  }

  async getUserByUsername (username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      user => user.username === username
    )
  }

  async createUser (insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++
    const user: User = { ...insertUser, id }
    this.users.set(id, user)
    return user
  }

  async getPosts (limit: number = 50, offset: number = 0): Promise<Post[]> {
    const postsArray = Array.from(this.posts.values())
      .sort(
        (a, b) =>
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      )
      .slice(offset, offset + limit)
    return postsArray
  }

  async getPostsByType (
    type: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter(post => post.type === type)
      .sort(
        (a, b) =>
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      )
      .slice(offset, offset + limit)
  }

  async getPostById (id: number): Promise<Post | undefined> {
    return this.posts.get(id)
  }

  async createPost (insertPost: InsertPost): Promise<Post> {
    const id = this.currentPostId++
    const post: Post = {
      ...insertPost,
      id,
      viewCount: 0,
      createdAt: new Date(),
      source: insertPost.source ?? null,
      author: insertPost.author ?? null,
      tags: insertPost.tags ?? null,
      isBreaking: insertPost.isBreaking ?? false
    }
    this.posts.set(id, post)
    return post
  }

  async searchPosts (query: string): Promise<Post[]> {
    const lowercaseQuery = query.toLowerCase()
    return Array.from(this.posts.values())
      .filter(
        post =>
          post.title.toLowerCase().includes(lowercaseQuery) ||
          post.content.toLowerCase().includes(lowercaseQuery) ||
          post.author?.toLowerCase().includes(lowercaseQuery) ||
          post.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      )
  }

  async incrementViewCount (id: number): Promise<void> {
    const post = this.posts.get(id)
    if (post) {
      post.viewCount = (post.viewCount || 0) + 1
      this.posts.set(id, post)
    }
  }

  async getPostsByDateRange (startDate: Date, endDate: Date): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter(post => {
        const postDate = new Date(post.createdAt!)
        return postDate >= startDate && postDate <= endDate
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      )
  }
}

export const storage = new MemStorage()
