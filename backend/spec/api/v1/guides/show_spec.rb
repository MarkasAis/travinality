require 'rails_helper'

RSpec.describe "guides#show", type: :request do
  let(:params) { {} }

  subject(:make_request) do
    jsonapi_get "/api/v1/guides/#{guide.id}", params: params
  end

  describe 'basic fetch' do
    let!(:guide) { create(:guide) }

    it 'works' do
      expect(GuideResource).to receive(:find).and_call_original
      make_request
      expect(response.status).to eq(200)
      expect(d.jsonapi_type).to eq('guides')
      expect(d.id).to eq(guide.id)
    end
  end
end
