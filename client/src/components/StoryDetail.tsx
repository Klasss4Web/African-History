import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Clock,
  User,
  Calendar,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ThumbsUp,
  Tag,
  ArrowRight,
  Eye,
  ArrowLeft,
} from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { ImageWithFallback } from "./fallbacks/ImageWithFallback";

const storyData: { [key: number]: any } = {
  1: {
    title: "The Wealth of Mansa Musa: Richest Person in History",
    author: "Dr. Amina Hassan",
    authorBio: "Professor of African History at University of Ghana",
    publishedDate: "November 15, 2023",
    readTime: "12 min read",
    category: "Biography",
    tags: ["Mali Empire", "Medieval Africa", "Trade Routes", "Islamic History"],
    excerpt:
      "Discover how the ruler of the Mali Empire became the wealthiest person who ever lived and changed the course of African and world history.",
    image:
      "https://images.unsplash.com/photo-1568366515672-33dfb61dc38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYW5jaWVudCUyMGFyY2hpdGVjdHVyZSUyMHB5cmFtaWR8ZW58MXx8fHwxNzU0NDY5ODUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    content: `
In the early 14th century, when Europe was struggling through famines and political upheaval, a king in West Africa possessed wealth so vast that his generosity single-handedly disrupted the economies of entire regions. This was Mansa Musa, ruler of the Mali Empire, whose legendary pilgrimage to Mecca in 1324 CE revealed to the world the extraordinary riches of medieval Africa.

## The Golden Empire

The Mali Empire, stretching across what is now Mali, Senegal, Mauritania, Guinea, Gambia, Guinea-Bissau, Niger, and Burkina Faso, controlled the lucrative trans-Saharan trade routes. Gold from the Bambuk and Bure goldfields flowed north, while salt from the Sahara moved south, creating a commercial network that generated immense wealth.

Mansa Musa inherited this empire around 1312 CE and expanded it to its greatest territorial extent, making it larger than Western Europe. Under his rule, the empire encompassed over 400 cities and controlled critical trade centers including Timbuktu, Djenné, and Gao.

## The Pilgrimage That Changed History

In 1324, Mansa Musa undertook the hajj, the Islamic pilgrimage to Mecca. This was no ordinary journey. His caravan included:

- 60,000 men, including 12,000 slaves
- 80 camels carrying 300 pounds of gold dust each
- Hundreds of horses and other animals
- A military escort and servants

## Impact on the Islamic World

Mansa Musa's pilgrimage had profound consequences that extended far beyond West Africa:

### Economic Disruption
His generous distribution of gold in Cairo, Medina, and Mecca caused significant inflation that lasted for over a decade. The sudden influx of gold devalued the metal so dramatically that it took 12 years for the economies to recover.

### Diplomatic Relations
The pilgrimage established Mali as a major power in the Islamic world. Mansa Musa met with the Mamluk Sultan of Egypt and other rulers, creating diplomatic ties that would benefit trade for generations.

### Cultural Exchange
The journey facilitated extensive cultural and intellectual exchange. Mansa Musa brought back scholars, architects, and administrators who helped develop Mali's educational and governmental systems.

## Timbuktu: The Jewel of Africa

Under Mansa Musa's patronage, Timbuktu became one of the world's great centers of learning. The city housed the famous Sankore University, where scholars from across the Islamic world came to study:

- Mathematics and Astronomy
- Islamic Jurisprudence
- Literature and Poetry
- Medicine and Philosophy

The university's library contained over 700,000 manuscripts, making it one of the largest collections of knowledge in the medieval world.

## Economic Innovations

Mansa Musa's administration implemented several economic innovations that sustained Mali's prosperity:

### Standardized Currency
The empire used standardized weights and measures for gold dust, creating a stable medium of exchange across its vast territory.

### Trade Regulation
Strict regulations governed trade routes, ensuring safe passage for merchants and consistent tax collection.

### Agricultural Development
Investment in irrigation and farming techniques supported the empire's growing population and urban centers.

## Legacy and Historical Impact

Mansa Musa's reign left an indelible mark on African and world history:

### Cartographic Recognition
His wealth and power were so renowned that the 1375 Catalan Atlas, one of the most important medieval maps, depicted him sitting on a throne, holding a golden orb, making Mali one of the few African kingdoms represented on European maps of the period.

### Architectural Heritage
The distinctive Sudano-Sahelian architectural style, promoted during his reign, can still be seen today in buildings across West Africa, including the Great Mosque of Djenné.

### Educational Legacy
The scholarly traditions established in Timbuktu during his era contributed to the preservation of countless manuscripts and the development of African intellectual traditions.

## Modern Assessments of Wealth

Contemporary historians estimate that Mansa Musa's wealth, adjusted for inflation, would exceed $400 billion today, making him arguably the richest person in human history. This wealth came from:

- Gold mining operations
- Salt trade monopolies
- Taxation of trans-Saharan commerce
- Agricultural surplus from fertile lands

## Conclusion

Mansa Musa's story challenges many preconceptions about medieval Africa and demonstrates the continent's central role in global trade networks. His empire's wealth, built on sophisticated economic systems and strategic geographic advantages, supported one of history's great civilizations.

The legacy of Mansa Musa extends beyond material wealth to encompass the cultural, educational, and architectural achievements that flourished under his rule. His story reminds us that Africa was home to some of the world's most powerful and sophisticated societies long before European colonization.

Today, as we seek to understand Africa's place in global history, Mansa Musa's reign stands as a testament to the continent's rich heritage of political organization, economic innovation, and cultural achievement.
    `,
    stats: {
      views: 15420,
      likes: 892,
      bookmarks: 456,
      comments: 23,
    },
    relatedStories: [
      {
        id: 2,
        title: "Queen Nzinga: The Warrior Queen of Angola",
        readTime: "10 min",
      },
      { id: 3, title: "The Great Libraries of Timbuktu", readTime: "8 min" },
      {
        id: 4,
        title: "Trade Routes That Built African Empires",
        readTime: "15 min",
      },
    ],
  },
  2: {
    title: "Queen Nzinga: The Warrior Queen of Angola",
    author: "Dr. Fatima Mbeki",
    authorBio: "Senior Researcher at Institute for African Studies",
    publishedDate: "October 28, 2023",
    readTime: "10 min read",
    category: "Biography",
    tags: ["Angola", "Resistance", "Leadership", "Portuguese Colonialism"],
    excerpt:
      "Learn about the brilliant military strategist who resisted Portuguese colonization for over 30 years and became one of Africa's greatest leaders.",
    image:
      "https://images.unsplash.com/photo-1627837586900-56adbee910a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZSUyMG1hc2t8ZW58MXx8fHwxNzU0NDY5ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    content: `
Queen Nzinga Mbandi was one of the most formidable rulers in African history, leading the resistance against Portuguese colonization in Angola for over three decades. Her tactical brilliance, diplomatic acumen, and unwavering commitment to her people's freedom made her a legendary figure whose influence extends far beyond her lifetime.

## Early Life and Rise to Power

Born around 1583 in the Kingdom of Ndongo, Nzinga was the daughter of King Kiluanji. Unlike many royal women of her time, she received comprehensive military and political training, learning the arts of warfare, diplomacy, and statecraft alongside her brothers.

When her brother Mbandi became king, Nzinga served as his chief advisor and diplomat. Her first major historical appearance was in 1622, when she negotiated with Portuguese Governor João Correia de Sousa in Luanda on behalf of her brother.

## The Famous Negotiation

The meeting between Nzinga and the Portuguese governor has become legendary. According to historical accounts:

- The Portuguese deliberately provided no chair for Nzinga, intending to force her to stand as a sign of submission
- Nzinga ordered one of her servants to get on hands and knees, using him as a human chair
- This act demonstrated her quick thinking and refusal to accept a position of inferiority

The negotiation resulted in a treaty that temporarily halted Portuguese slave raids, though it was later broken by the Portuguese.

## Becoming Queen

After her brother's death in 1624, Nzinga became Queen of Ndongo and later also ruled Matamba. Her ascension to power was remarkable in several ways:

### Breaking Gender Barriers
- She ruled in her own right, not as a regent
- Adopted male dress and titles when politically advantageous  
- Led troops personally in battle
- Challenged traditional gender roles while maintaining cultural legitimacy

### Military Innovation
Nzinga revolutionized African military tactics by:
- Incorporating Portuguese weapons and techniques
- Developing guerrilla warfare strategies
- Creating mobile fighting forces
- Building strategic alliances with other African kingdoms

## The Long Resistance (1626-1656)

For thirty years, Queen Nzinga fought a sophisticated resistance campaign against Portuguese colonization:

### Tactical Brilliance
- Used the mountainous terrain of Angola to her advantage
- Employed hit-and-run tactics that frustrated Portuguese conventional forces
- Established fortified positions in inaccessible areas
- Created supply lines that sustained long campaigns

### Diplomatic Strategy
- Formed alliances with the Dutch when they occupied Luanda (1641-1648)
- Negotiated with various European powers to play them against each other
- Maintained relationships with neighboring African kingdoms
- Balanced cooperation and resistance as circumstances required

### Social Policy
- Granted sanctuary to escaped slaves
- Integrated refugees into her military forces
- Maintained traditional governance structures while adapting to new challenges
- Protected trade routes important to her kingdom's economy

## Leadership Philosophy

Queen Nzinga's approach to leadership was characterized by several key principles:

### Pragmatic Flexibility
She adapted her strategies based on changing circumstances, sometimes cooperating with the Portuguese when it served her people's interests, and resuming resistance when necessary.

### Cultural Preservation
Despite external pressures, she maintained traditional African customs and governance systems while selectively adopting useful foreign innovations.

### Military Excellence
She personally led military campaigns and was known for her courage in battle, earning the respect of both her warriors and enemies.

## Later Years and Peace

In her later years, Queen Nzinga shifted toward diplomatic solutions:

### The Peace of 1656
- Negotiated a lasting peace treaty with the Portuguese
- Secured recognition of her sovereignty over Matamba
- Established terms for trade and diplomatic relations
- Converted to Christianity (likely for political reasons)

### Administrative Achievements
- Established efficient governmental systems
- Promoted trade and economic development
- Built diplomatic relationships across the region
- Left a stable succession plan

## Cultural and Historical Impact

Queen Nzinga's influence extends far beyond her military campaigns:

### Symbol of Resistance
She became an enduring symbol of African resistance to colonialism, inspiring liberation movements across the continent centuries later.

### Women's Leadership
Her reign challenged assumptions about women's capabilities in leadership and warfare, influencing attitudes toward female rulers.

### Military Innovation
Her tactical innovations influenced African military thinking and were studied by later resistance leaders.

### Cultural Memory
She remains a central figure in Angolan national identity and is celebrated throughout Africa as a symbol of dignity and resistance.

## Modern Recognition

Today, Queen Nzinga is remembered and honored in various ways:

### In Angola
- The national currency features her image
- Numerous schools and institutions bear her name
- She is considered the foundational figure of Angolan nationalism

### International Recognition
- Studied in military academies as an example of effective guerrilla warfare
- Featured in literature, films, and academic works worldwide
- Recognized as one of history's great female leaders

### Academic Study
Modern historians have reassessed her achievements, recognizing her as:
- A brilliant military strategist
- An effective diplomat and negotiator  
- A visionary leader who preserved African sovereignty
- An early example of successful anti-colonial resistance

## Lessons for Today

Queen Nzinga's life offers several timeless lessons:

### Strategic Thinking
Her ability to adapt tactics and strategies based on changing circumstances demonstrates the importance of flexibility in leadership.

### Cultural Pride
She maintained pride in African traditions while pragmatically adopting useful innovations from other cultures.

### Persistence
Her thirty-year resistance campaign shows the power of sustained commitment to principles and goals.

### Diplomatic Skill
Her success in balancing military action with diplomatic negotiation illustrates the complexity of effective leadership.

## Conclusion

Queen Nzinga Mbandi stands as one of history's most remarkable leaders, demonstrating exceptional military skill, diplomatic acumen, and unwavering commitment to her people's freedom. Her resistance against Portuguese colonization not only preserved African sovereignty for decades but also established principles and tactics that would inspire anti-colonial movements worldwide.

Her story challenges stereotypes about pre-colonial Africa and women's leadership, revealing a sophisticated political leader who successfully navigated one of history's most challenging periods. Today, as we continue to grapple with questions of leadership, resistance, and cultural identity, Queen Nzinga's example remains as relevant and inspiring as ever.

In honoring her memory, we recognize not just a great African leader, but a visionary who understood that true victory sometimes requires adapting one's methods while never compromising one's principles.
    `,
    stats: {
      views: 12850,
      likes: 745,
      bookmarks: 389,
      comments: 18,
    },
    relatedStories: [
      { id: 1, title: "The Wealth of Mansa Musa", readTime: "12 min" },
      {
        id: 5,
        title: "African Resistance to Colonial Rule",
        readTime: "14 min",
      },
      { id: 6, title: "Women Warriors of Africa", readTime: "11 min" },
    ],
  },
};

const comments = [
  {
    id: 1,
    author: "Sarah Johnson",
    avatar: "SJ",
    date: "2 days ago",
    content:
      "This is such a fascinating story! I had no idea about the extent of Mansa Musa's wealth and its impact on the medieval world economy.",
    likes: 12,
    replies: [],
  },
  {
    id: 2,
    author: "Ahmed Hassan",
    avatar: "AH",
    date: "1 week ago",
    content:
      "Excellent article! The section about Timbuktu's role as a center of learning really highlights how advanced African civilizations were.",
    likes: 8,
    replies: [
      {
        id: 3,
        author: "Dr. Amina Hassan",
        avatar: "DH",
        date: "6 days ago",
        content:
          "Thank you! I'm glad you found that section informative. The Sankore University was truly one of the world's great centers of learning.",
        likes: 5,
      },
    ],
  },
  {
    id: 4,
    author: "Maria Santos",
    avatar: "MS",
    date: "3 days ago",
    content:
      "Would love to see more articles about other African empires of this period. The Mali Empire's influence seems to have been enormous!",
    likes: 15,
    replies: [],
  },
];

export default function StoryDetail() {
  const { id } = useParams<{ id: string }>();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [storyComments, setStoryComments] = useState(comments);

  const storyId = id ? parseInt(id) : null;
  const story = storyId ? storyData[storyId] : null;

  if (!story) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-900 mb-2">Story Not Found</h2>
          <p className="text-gray-600 mb-4">
            The requested story could not be found.
          </p>
          <Link to="/stories">
            <Button>Back to Stories</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    // In a real app, this would update the backend
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real app, this would update the backend
  };

  const handleComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: storyComments.length + 1,
        author: "You",
        avatar: "Y",
        date: "Just now",
        content: newComment,
        likes: 0,
        replies: [],
      };
      setStoryComments([...storyComments, comment]);
      setNewComment("");
    }
  };

  const formatContent = (content: string) => {
    return content.split("\n").map((paragraph, index) => {
      if (paragraph.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl text-gray-900 mt-8 mb-4">
            {paragraph.replace("## ", "")}
          </h2>
        );
      }
      if (paragraph.startsWith("### ")) {
        return (
          <h3 key={index} className="text-xl text-gray-900 mt-6 mb-3">
            {paragraph.replace("### ", "")}
          </h3>
        );
      }
      if (paragraph.trim() === "") {
        return <br key={index} />;
      }
      if (paragraph.startsWith("- ")) {
        return (
          <li key={index} className="ml-6 mb-2 text-gray-700">
            {paragraph.replace("- ", "")}
          </li>
        );
      }
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-4">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/stories">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Stories
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="relative">
            <ImageWithFallback
              src={story.image}
              alt={story.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <Badge className="mb-4 bg-amber-600 text-white">
                {story.category}
              </Badge>
              <h1 className="text-3xl lg:text-4xl text-white mb-4">
                {story.title}
              </h1>
            </div>
          </div>

          <div className="p-8">
            {/* Article Meta */}
            <div className="flex flex-wrap items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <Avatar className="w-12 h-12">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white">
                    <User className="w-6 h-6" />
                  </div>
                </Avatar>
                <div>
                  <div className="text-gray-900">{story.author}</div>
                  <div className="text-sm text-gray-500">{story.authorBio}</div>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {story.publishedDate}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {story.readTime}
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {story.stats.views.toLocaleString()} views
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-8">
              <div className="text-xl text-gray-600 mb-6 leading-relaxed border-l-4 border-amber-500 pl-6 italic">
                {story.excerpt}
              </div>

              <div className="text-gray-800 leading-relaxed">
                {formatContent(story.content)}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {story.tags.map((tag: string, index: number) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="flex items-center"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Article Actions */}
            <div className="flex items-center justify-between py-6 border-t border-b border-gray-200">
              <div className="flex items-center space-x-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`flex items-center space-x-2 ${
                    isLiked ? "text-red-600" : "text-gray-600"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
                  />
                  <span>{story.stats.likes + (isLiked ? 1 : 0)}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 text-gray-600"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{storyComments.length}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBookmark}
                  className={`flex items-center space-x-2 ${
                    isBookmarked ? "text-amber-600" : "text-gray-600"
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
                  />
                  <span>{story.stats.bookmarks + (isBookmarked ? 1 : 0)}</span>
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-gray-600"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </Button>
            </div>

            {/* Comments Section */}
            <div className="mt-8">
              <h3 className="text-2xl text-gray-900 mb-6">
                Comments ({storyComments.length})
              </h3>

              {/* Add Comment */}
              <div className="mb-8">
                <Textarea
                  placeholder="Share your thoughts about this story..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-4"
                />
                <Button onClick={handleComment} disabled={!newComment.trim()}>
                  Post Comment
                </Button>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {storyComments.map((comment) => (
                  <div key={comment.id} className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-10 h-10">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white text-sm">
                          {comment.avatar}
                        </div>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-gray-900">
                            {comment.author}
                          </span>
                          <span className="text-sm text-gray-500">
                            {comment.date}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2">{comment.content}</p>
                        <div className="flex items-center space-x-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-gray-500 p-0 h-auto"
                          >
                            <ThumbsUp className="w-3 h-3 mr-1" />
                            {comment.likes}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-gray-500 p-0 h-auto"
                          >
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Replies */}
                    {comment.replies &&
                      comment.replies.map((reply: any) => (
                        <div
                          key={reply.id}
                          className="ml-14 flex items-start space-x-4"
                        >
                          <Avatar className="w-8 h-8">
                            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs">
                              {reply.avatar}
                            </div>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-gray-900 text-sm">
                                {reply.author}
                              </span>
                              <span className="text-xs text-gray-500">
                                {reply.date}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm mb-2">
                              {reply.content}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs text-gray-500 p-0 h-auto"
                            >
                              <ThumbsUp className="w-3 h-3 mr-1" />
                              {reply.likes}
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Related Stories */}
        <Card className="mb-8">
          <div className="p-6">
            <h3 className="text-xl text-gray-900 mb-4">Related Stories</h3>
            <div className="space-y-4">
              {story.relatedStories.map((relatedStory: any, index: number) => (
                <Link
                  key={index}
                  to={`/stories/${relatedStory.id}`}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors block"
                >
                  <div className="flex-1">
                    <h4 className="text-gray-900 hover:text-amber-600 transition-colors">
                      {relatedStory.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {relatedStory.readTime}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Link>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
