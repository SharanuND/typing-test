import TypingTest from '@/components/TypingTest';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Typing Speed Test
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Test your typing speed and accuracy with our interactive typing test. 
          Type the text below as quickly and accurately as possible.
        </p>
        <TypingTest />
      </div>
    </main>
  );
} 