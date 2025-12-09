
import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Mail, MessageSquare, Reply, User, Clock, ChevronDown, ChevronUp } from 'lucide-react';

const Inbox: React.FC = () => {
  const { t, messages, replyToMessage } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      setReplyContent('');
    }
  };

  const handleReply = async (id: string) => {
    if (!replyContent.trim()) return;
    setIsReplying(true);
    await replyToMessage(id, replyContent);
    setIsReplying(false);
    setReplyContent('');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-white border-b border-slate-200 pt-8 pb-6 px-4 mb-8">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Mail className="text-primary-600" />
            {t('inbox')}
            <span className="bg-primary-100 text-primary-600 text-sm px-2 py-1 rounded-full">{messages.length}</span>
          </h1>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4">
        {messages.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Mail size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{t('noMessages')}</h3>
            <p className="text-slate-500">{t('noMessagesDesc')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div 
                  onClick={() => toggleExpand(msg.id)}
                  className={`p-6 cursor-pointer hover:bg-slate-50 transition-colors ${expandedId === msg.id ? 'bg-slate-50' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="font-bold text-slate-900 text-lg">{msg.senderName}</div>
                      <span className="text-slate-400 text-sm px-2">•</span>
                      <span className="text-primary-600 text-sm font-medium">{msg.opportunityTitle}</span>
                    </div>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock size={12} />
                      {new Date(msg.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-600 line-clamp-2 text-sm">{msg.content}</p>
                  
                  {expandedId !== msg.id && (
                     <div className="mt-2 text-xs text-slate-400 flex justify-center">
                        <ChevronDown size={16} />
                     </div>
                  )}
                </div>

                {expandedId === msg.id && (
                  <div className="p-6 pt-0 bg-slate-50 border-t border-slate-100">
                    <div className="mb-6 p-4 bg-white rounded-lg border border-slate-200 mt-4">
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                         <User size={12} /> {msg.senderEmail}
                      </div>
                      <p className="text-slate-800">{msg.content}</p>
                    </div>

                    {/* Replies */}
                    {msg.replies.length > 0 && (
                      <div className="mb-6 space-y-3 pl-4 rtl:pl-0 rtl:pr-4 border-l-2 rtl:border-l-0 rtl:border-r-2 border-slate-200">
                        {msg.replies.map(reply => (
                          <div key={reply.id} className="bg-blue-50 p-3 rounded-lg rounded-tl-none rtl:rounded-tl-lg rtl:rounded-tr-none">
                            <div className="text-xs font-bold text-blue-700 mb-1">{t('you')}</div>
                            <p className="text-slate-700 text-sm">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Form */}
                    <div className="flex gap-2">
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder={t('replyPlaceholder')}
                        className="flex-grow rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none resize-none"
                        rows={2}
                      />
                      <button 
                        onClick={() => handleReply(msg.id)}
                        disabled={isReplying || !replyContent.trim()}
                        className="bg-primary-600 text-white p-3 rounded-xl hover:bg-primary-700 disabled:opacity-50 transition-colors flex items-center justify-center"
                      >
                         <Reply size={20} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
