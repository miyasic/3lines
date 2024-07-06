"use client";

import React, { useCallback, useMemo, useState } from 'react';

interface AppButtonProps {
    title: string;
    onClick: () => void;
}

const AppButton = ({ title, onClick }: AppButtonProps) => {
    return (
        <button
            onClick={() => onClick()}
            style={{
                width: 'auto', // 幅を自動に設定
                minWidth: '200px', // 最小幅を設定
                padding: '12px 24px', // パディングを調整
                backgroundColor: '#38a169',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px', // フォントサイズを調整
                fontWeight: 'bold', // フォントを太くする
                transition: 'background-color 0.3s', // トランジション効果を追加
                margin: '0 auto', // 中央に配置
                display: 'block', // ブロック要素に変更
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2f855a'} // ホバー時の色を設定
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#38a169'} // マウスが離れたときの色を元に戻す
        >
            {title}
        </button>
    );
}

export default AppButton;