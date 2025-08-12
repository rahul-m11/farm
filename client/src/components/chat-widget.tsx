import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { ChatMessage } from "@shared/schema";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sessionId] = useState(() => `session-${Date.now()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { data: messages = [] } = useQuery<ChatMessage[]>({
    queryKey: ['/api/chat', sessionId],
    enabled: isOpen,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (messageText: string) => {
      const response = await apiRequest('POST', '/api/chat', {
        message: messageText,
        sessionId,
        isFromAI: false,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/chat', sessionId] });
      setMessage("");
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessageMutation.mutate(message.trim());
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="chat-widget bg-forest-green text-white w-14 h-14 rounded-full shadow-lg hover:bg-forest-green/90 transition-all"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      
      {/* Chat Window */}
      {isOpen && (
        <Card className="absolute bottom-16 right-0 w-80 shadow-2xl border border-gray-200">
          {/* Chat Header */}
          <CardHeader className="bg-forest-green text-white p-4 rounded-t-lg flex-row items-center justify-between space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-bright-green rounded-full flex items-center justify-center">
                <Bot className="text-white h-4 w-4" />
              </div>
              <div>
                <h4 className="font-semibold">Farm AI Assistant</h4>
                <p className="text-xs opacity-80">Always here to help</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-gray-200 h-6 w-6"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          {/* Chat Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3 bg-mint-chat">
            {messages.length === 0 && (
              <div className="chat-bubble flex items-start space-x-2">
                <div className="w-6 h-6 bg-forest-green rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="text-white h-3 w-3" />
                </div>
                <div className="bg-white rounded-lg p-3 max-w-xs shadow-sm">
                  <p className="text-sm">
                    Hi! I'm your farming assistant. I can help with crop advice, weather insights, 
                    pest management, and more. What would you like to know?
                  </p>
                </div>
              </div>
            )}
            
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`chat-bubble flex items-start space-x-2 ${
                  msg.isFromAI ? '' : 'justify-end'
                }`}
              >
                {msg.isFromAI && (
                  <div className="w-6 h-6 bg-forest-green rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="text-white h-3 w-3" />
                  </div>
                )}
                <div className={`rounded-lg p-3 max-w-xs ${
                  msg.isFromAI 
                    ? 'bg-white shadow-sm' 
                    : 'bg-forest-green text-white'
                }`}>
                  <p className="text-sm">{msg.message}</p>
                </div>
                {!msg.isFromAI && (
                  <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="text-white h-3 w-3" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input */}
          <CardContent className="p-4 border-t border-gray-200">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input 
                type="text" 
                placeholder="Ask about farming..." 
                className="flex-1 text-sm focus:ring-2 focus:ring-forest-green"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={sendMessageMutation.isPending}
              />
              <Button 
                type="submit"
                size="icon"
                className="bg-forest-green text-white hover:bg-forest-green/90"
                disabled={sendMessageMutation.isPending || !message.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-2">Powered by Google Gemini</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
